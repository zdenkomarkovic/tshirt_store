import { z } from "zod";

export const ProductSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long" })
    .max(50, { message: "Title can be maximum 50 characters long" }),
  description: z.string().min(2).max(500),
});
