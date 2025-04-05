import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthRedirectConsumer from "./AuthRedirect";

/**
 * Wrapper component that provides navigation context for the AuthRedirect functionality
 */
const AuthRedirectWrapper = ({ children }) => {
  return children;
};

export default AuthRedirectWrapper;
