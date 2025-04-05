import axios from "axios";
import { baseURL } from "../Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeEventEmitter, NativeModules } from "react-native";

// Debug utility to log the current API configuration
console.log("API Configuration:", {
  baseURL: baseURL.includes("https")
    ? `${baseURL}${baseURL.endsWith("/") ? "" : "/"}api`
    : `http://${baseURL}/api`,
  environment: __DEV__ ? "development" : "production",
});

// Create a simpler event handling mechanism that won't crash the app
const createErrorEmitter = () => {
  const listeners = new Map();

  return {
    addListener: (eventType, listener) => {
      if (!listeners.has(eventType)) {
        listeners.set(eventType, new Set());
      }
      listeners.get(eventType).add(listener);

      return {
        remove: () => {
          const typeListeners = listeners.get(eventType);
          if (typeListeners) {
            typeListeners.delete(listener);
          }
        },
      };
    },

    emit: (eventType, event) => {
      const typeListeners = listeners.get(eventType);
      if (typeListeners) {
        typeListeners.forEach((listener) => {
          try {
            listener(event);
          } catch (error) {
            console.error("Error in event listener:", error);
          }
        });
      }
    },
  };
};

// Set up global error emitter if it doesn't exist
if (!global.ErrorEmitter) {
  global.ErrorEmitter = createErrorEmitter();
}

// Create axios instance with base configuration
const instance = axios.create({
  baseURL: baseURL?.includes("https")
    ? `${baseURL}${baseURL.endsWith("/") ? "" : "/"}api` // Ensure there's a slash before 'api'
    : `http://${baseURL}/api`, // Use the full URL from Constants
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Variable to track if token refresh is in progress
let isRefreshing = false;
// Store queued requests that should be retried after token refresh
let failedQueue = [];

// Function to process queued requests after successful token refresh
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Function to handle logout - no longer uses navigation hook
const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("customer");

    // Emit logout event instead of directly navigating
    // The component listening to this event will handle navigation
    global.ErrorEmitter.emit("LOGOUT", {
      message: "Session expired. Please login again.",
      redirectToLogin: true,
    });

    // We can't navigate directly from here since we're not in a component
    // The component that catches this event should handle navigation
  } catch (error) {
    console.error("Logout error:", error);
  }
};

// Function to refresh the token
const refreshToken = async () => {
  try {
    // Get refresh token from storage
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    // Create a different axios instance for token refresh to avoid interceptors
    const response = await axios.post(
      baseURL.includes("https")
        ? `${baseURL}${baseURL.endsWith("/") ? "" : "/"}api/auth/refresh-token/`
        : `http://${baseURL}/api/auth/refresh-token/`,
      {
        refresh: refreshToken,
      }
    );

    // Store the new tokens
    const { access, refresh } = response.data;
    await AsyncStorage.setItem("token", access);
    await AsyncStorage.setItem("refreshToken", refresh);

    return access;
  } catch (error) {
    console.error("Token refresh failed:", error);
    // Handle logout when refresh fails
    await handleLogout();
    throw error;
  }
};

// Add request interceptor with logging
instance.interceptors.request.use(
  async (config) => {
    try {
      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem("token");

      // If token exists, add it to Authorization header
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Log request details
      console.log("API Request:", {
        url: config.url,
        method: config.method,
        baseURL: config.baseURL,
        headers: config.headers,
        data: config.data,
      });

      return config;
    } catch (error) {
      console.error("Request interceptor error:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor with better error handling
instance.interceptors.response.use(
  (response) => {
    // Log successful response
    return response;
  },
  async (error) => {
    // Log error details
    console.error("API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      baseURL: error.config?.baseURL,
      stack: error.stack,
    });

    const originalRequest = error.config;

    // Handle 401 Unauthorized errors - token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If refresh already in progress, queue this request
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return instance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Try to refresh the token
        const newToken = await refreshToken();

        // Update Authorization header
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        // Process queued requests
        processQueue(null, newToken);

        // Retry the original request
        return instance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, process queue with error
        processQueue(refreshError, null);

        // Handle logout
        await handleLogout();

        return Promise.reject({
          message: "Session expired. Please login again.",
          redirectToLogin: true,
        });
      } finally {
        isRefreshing = false;
      }
    }

    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        message:
          "Network error. Please check your connection and server status.",
        error: error.message,
        baseURL: error.config?.baseURL,
      });
    }

    // Handle server errors (500)
    if (error.response?.status === 500) {
      return Promise.reject({
        message: "Server error. Please try again later.",
        error: error.response.data,
      });
    }

    return Promise.reject(error);
  }
);

export default instance;
