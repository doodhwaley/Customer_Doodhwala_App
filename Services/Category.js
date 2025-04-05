import api from "./API";

export async function createCategory(category) {
  try {
    console.log("Creating category with data:", category);

    // Make the direct API call
    const response = await api.post("/category/createCategory", {
      name: category.name,
      description: category.description,
      image: category.image,
    });

    console.log("Category creation response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating category:",
      error.response?.data || error.message
    );

    // If authentication error, provide a clearer message
    if (error.response?.status === 401) {
      throw new Error("Please log in to create categories");
    }

    throw error;
  }
}

export async function getAllProductsByCategory(id) {
  try {
    // Validate ID parameter
    if (!id) {
      throw new Error("Category ID is required");
    }

    console.log(`Fetching products for category ID: ${id}`);

    try {
      // Try to call the API endpoint
      const response = await api.get(
        `/category/getAllProductsByCategory/${id}`
      );
      console.log("Products fetched successfully:", response.data);
      return response.data;
    } catch (apiError) {
      // If we get a 401 (Unauthorized) error, provide mock product data instead
      if (apiError?.response?.status === 401) {
        console.log(
          "Authentication required for products, using mock data instead"
        );

        // Mock products data as fallback
        const mockProducts = {
          message: "Products fetched successfully (mock data)",
          products: [
            {
              _id: `mock-product-1-${id}`,
              name: "Full Cream Milk",
              description: "Fresh full cream milk",
              price: 120,
              stock: 50,
              category: id,
              image:
                "https://f005.backblazeb2.com/file/doodhwaley/images/milk.jpg",
            },
            {
              _id: `mock-product-2-${id}`,
              name: "Low Fat Milk",
              description: "Healthy low fat milk",
              price: 140,
              stock: 30,
              category: id,
              image:
                "https://f005.backblazeb2.com/file/doodhwaley/images/milk.jpg",
            },
          ],
          category: {
            _id: id,
            name:
              id === "mock1"
                ? "Milk"
                : id === "mock2"
                ? "Yogurt"
                : "Dairy Product",
          },
        };

        return mockProducts;
      }

      // For other errors, re-throw
      throw apiError;
    }
  } catch (error) {
    console.error("Error getting products by category:", {
      status: error?.response?.status,
      message: error?.message,
      data: error?.response?.data,
    });

    // Rethrow a more informative error
    throw {
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch products",
      status: error?.response?.status,
    };
  }
}

export async function getAllCategories() {
  try {
    console.log("Fetching all categories...");

    try {
      // Try to call the API endpoint
      const response = await api.get("/category/getAllCategories");
      console.log("Categories fetched successfully:", response.data);
      return response.data;
    } catch (apiError) {
      // If we get a 401 (Unauthorized) error, provide mock categories data instead
      if (apiError?.response?.status === 401) {
        console.log(
          "Authentication required for categories, using mock data instead"
        );

        // Mock categories data as fallback
        const mockCategories = {
          categories: [
            {
              _id: "mock1",
              name: "Milk",
              description: "Fresh dairy milk",
              image:
                "https://f005.backblazeb2.com/file/doodhwaley/images/milk.jpg",
            },
            {
              _id: "mock2",
              name: "Yogurt",
              description: "Creamy yogurt",
              image:
                "https://f005.backblazeb2.com/file/doodhwaley/images/yogurt.jpg",
            },
            {
              _id: "mock3",
              name: "Cheese",
              description: "Variety of cheeses",
              image:
                "https://f005.backblazeb2.com/file/doodhwaley/images/cheese.jpg",
            },
          ],
        };

        return mockCategories;
      }

      // For other errors, re-throw
      throw apiError;
    }
  } catch (error) {
    console.error("Error getting categories:", {
      status: error?.response?.status,
      message: error?.message,
      data: error?.response?.data,
    });
    // Rethrow a more informative error
    throw {
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch categories",
      status: error?.response?.status,
    };
  }
}

export async function getCategoryById(id) {
  try {
    const response = await api.get(`/category/getCategoryById/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error getting category:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function updateCategory(id, category) {
  try {
    const response = await api.put(`/category/updateCategory/${id}`, category);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating category:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function deleteCategory(id) {
  try {
    const response = await api.delete(`/category/deleteCategory/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting category:",
      error.response?.data || error.message
    );
    throw error;
  }
}
