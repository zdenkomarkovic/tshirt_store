"use server";

import Product from "@/database/product.model";
import { revalidatePath } from "@/node_modules/next/cache";
import { connectToDatabase } from "../mongoose";
import { CreateProductParams } from "./sharedTypes";

export async function createProduct(params: CreateProductParams) {
  try {
    connectToDatabase();
    const { title, description, path } = params;
    const newProduct = await Product.create({
      title,
      description,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
