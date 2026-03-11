import type { Product } from "@wondermall/types";
import { fakestoreClient } from "./client";

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await fakestoreClient.get<Product[]>("/products");
  return data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const { data } = await fakestoreClient.get<Product>(`/products/${id}`);
  return data;
};

export const getCategories = async (): Promise<string[]> => {
  const { data } = await fakestoreClient.get<string[]>("/products/categories");
  return data;
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const { data } = await fakestoreClient.get<Product[]>(`/products/category/${category}`);
  return data;
};
