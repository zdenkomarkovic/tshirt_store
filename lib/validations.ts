import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024;
const IMAGE_TYPES = ["image/jpg", "image/png", "image/webp", "image/jpeg"];

export const ProductSchema = z.object({
  title: z.string().min(5).max(100),
  category: z.string(),
  // brand: z.string().optional(),
  price: z.coerce.number(),
  discount: z.coerce.number().optional(),
  stock: z.coerce.number().optional(),
  image: z.custom<File>(),
  features: z.string(),
  description: z.string(),
  hidden: z.boolean().default(false).optional(),
  showOnLandingPage: z.boolean().default(false).optional(),
  productCode: z.string().optional(),
  // avaibility: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const CategorySchema = z.object({
  title: z.string().min(5).max(100),
  linked: z.string().optional(),
  image: z.custom<File>().optional(),
  description: z.string(),
});

export const SliderSchema = z.object({
  title: z.string().min(5).max(100),
  subtitle: z.string().optional(),
  image: z.custom<File>(),
  link: z.string(),
});
export const VisibilitySchema = z.object({
  title: z.string(),
  hidden: z.boolean().default(false).optional(),
});
