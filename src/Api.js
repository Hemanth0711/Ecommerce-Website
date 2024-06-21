// src/api.js
const BASE_URL = "https://fakestoreapi.com";

export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  return response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  return response.json();
};
