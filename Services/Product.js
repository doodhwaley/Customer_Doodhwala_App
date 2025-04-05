import axios from "./API";

export async function createProduct(product) {
  try {
    const response = await axios.post("/product/createProduct", {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      stock: product.stock,
      discount: product.discount,
      size: product.size,
      tags: product.tags,
      brand: product.brand,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating product:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function getProductById(id) {
  return axios.get(`/product/getProductById/${id}`).then((response) => {
    return response.data;
  });
}

export async function getProducts() {
  return axios.get("/product/getProducts").then((response) => {
    return response.data;
  });
}

export async function updateProduct(id, product) {
  return axios.put(`/product/updateProduct/${id}`, product).then((response) => {
    return response.data;
  });
}

export async function deleteProduct(id) {
  return axios.delete(`/product/deleteProduct/${id}`).then((response) => {
    return response.data;
  });
}

export async function getProductsByCategory(categoryId) {
  return axios
    .get(`/product/getProductsByCategory/${categoryId}`)
    .then((response) => {
      return response.data;
    });
}
