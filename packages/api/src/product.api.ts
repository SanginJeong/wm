import { ProductListSchema, ProductSchema } from "@wondermall/types";
import { fakestoreInstance } from "./instance";

export const getProducts = async () => {
  const { data } = await fakestoreInstance.get("/products");
  return ProductListSchema.parse(data);
};

export const getProduct = async (id: number) => {
  const { data } = await fakestoreInstance.get(`/products/${id}`);
  return ProductSchema.parse(data);
};

export const getCategories = async (): Promise<string[]> => {
  const { data } = await fakestoreInstance.get<string[]>("/products/categories");
  return data;
};

export const getProductsByCategory = async (category: string) => {
  const encodedCategory = encodeURIComponent(category);
  const { data } = await fakestoreInstance.get(`/products/category/${encodedCategory}`);
  return ProductListSchema.parse(data);
};
