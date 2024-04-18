import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024;
const IMAGE_TYPES = ["image/jpg", "image/png", "image/webp", "image/jpeg"];

export const ProductSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long" })
    .max(100, { message: "Title can be maximum 100 characters long" }),
  price: z.coerce.number(),
  discount: z.coerce.number().optional(),
  stock: z.coerce.number().optional(),
  image: z.custom<File>(),
  features: z.string(),
  description: z.string().min(2).max(5000),
});
