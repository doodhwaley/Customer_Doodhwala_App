import { useState, useEffect, useCallback } from "react";
import { getAllProductsByCategory } from "../Services/Category";
import { Alert } from "react-native";

/**
 * Custom hook to fetch products by category ID
 * @param {string} categoryId - The ID of the category to fetch products for
 * @returns {Object} - Products data, loading state, error, and refresh function
 */
const useGetProductsByCategory = (categoryId) => {
  // Initialize state variables
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Create a memoized fetch function that depends on categoryId
  const fetchProducts = useCallback(async () => {
    if (!categoryId) {
      setLoading(false);
      setError("Category ID is required");
      return;
    }

    try {
      console.log("Fetching products for category:", categoryId);
      setLoading(true);
      setError(null);
      const response = await getAllProductsByCategory(categoryId);

      // Set products from response
      if (response?.products) {
        setProducts(response.products);
        if (response.category) {
          setCategory(response.category);
        }
      } else {
        console.warn("Unexpected products response format:", response);
        setProducts([]);
      }
    } catch (err) {
      console.error("Error in useGetProductsByCategory hook:", err);
      setError(err.message || "Failed to fetch products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  // Effect to fetch products when component mounts or categoryId changes
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Return the state and a function to refresh
  return {
    products,
    category,
    loading,
    error,
    refresh: fetchProducts,
  };
};

export default useGetProductsByCategory;
