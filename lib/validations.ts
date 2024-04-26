import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024;
const IMAGE_TYPES = ["image/jpg", "image/png", "image/webp", "image/jpeg"];

export const ProductSchema = z.object({
  title: z.string().min(5).max(100),
  price: z.coerce.number(),
  discount: z.coerce.number().optional(),
  stock: z.coerce.number().optional(),
  image: z.custom<File>().optional(),
  features: z.string(),
  description: z.string(),
});
