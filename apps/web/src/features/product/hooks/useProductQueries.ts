import { useQuery } from "@tanstack/react-query";
import { getProducts, getProduct, getCategories, getProductsByCategory } from "@wondermall/api";

export const productKeys = {
  all: ["products"] as const,
  detail: (id: number) => ["products", id] as const,
  categories: ["products", "categories"] as const,
  byCategory: (category: string) => ["products", "category", category] as const,
};

export const useProducts = () =>
  useQuery({ queryKey: productKeys.all, queryFn: getProducts, staleTime: 1000 * 60 * 5 });

export const useProduct = (id: number) =>
  useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProduct(id),
    staleTime: 1000 * 60 * 5,
  });

export const useCategories = () =>
  useQuery({ queryKey: productKeys.categories, queryFn: getCategories, staleTime: 1000 * 60 * 60 });

export const useProductsByCategory = (category: string) =>
  useQuery({
    queryKey: productKeys.byCategory(category),
    queryFn: () => getProductsByCategory(category),
    staleTime: 1000 * 60 * 5,
  });
