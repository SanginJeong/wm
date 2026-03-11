import { z } from "zod";

export const ProductRatingSchema = z.object({
  rate: z.number(),
  count: z.number(),
});

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string().url(),
  rating: ProductRatingSchema,
});

export const ProductListSchema = z.array(ProductSchema);

export type ProductRating = z.infer<typeof ProductRatingSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type ProductList = z.infer<typeof ProductListSchema>;
