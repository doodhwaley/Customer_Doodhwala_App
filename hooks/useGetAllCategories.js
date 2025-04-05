import { useEffect, useState, useCallback } from "react";
import { getAllCategories } from "../Services/Category";
import { Alert } from "react-native";

const useGetAllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getAllCategories();

      // Improved handling of response formats
      if (response?.categories) {
        setCategories(response.categories);
      } else if (Array.isArray(response)) {
        setCategories(response);
      } else if (!response) {
        console.warn("No response received from getAllCategories");
        setCategories([]);
      } else {
        console.warn("Unexpected categories response format:", response);
        setCategories(Array.isArray(response.data) ? response.data : []);
      }
    } catch (err) {
      console.error("Error in useGetAllCategories hook:", err);

      // Safer error handling with more detail
      const errorMessage =
        typeof err === "string"
          ? err
          : err?.response?.data?.message ||
            err?.message ||
            "Failed to fetch categories";

      setError(errorMessage);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  return {
    categories,
    loading,
    error,
    refresh: fetchAllCategories,
  };
};

export default useGetAllCategories;
