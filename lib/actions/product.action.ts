"use server";

import Product from "@/database/product.model";
import { revalidatePath } from "@/node_modules/next/cache";
import { connectToDatabase } from "../mongoose";
import {
  CreateProductParams,
  DeleteProductParams,
  EditProductParams,
  GetProductByIdParams,
} from "./sharedTypes";

export async function createProduct(params: CreateProductParams) {
  try {
    connectToDatabase();
    const {
      title,
      price,
      discount,
      stock,
      image,
      features,
      description,
      path,
    } = params;
    const newProduct = await Product.create({
      title,
      price,
      discount,
      stock,
      image,
      features,
      description,
    });

    // revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
export async function getProducts() {
  try {
    connectToDatabase();
    const products = await Product.find();
    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(params: DeleteProductParams) {
  try {
    connectToDatabase();
    const { productId, path } = params;
    await Product.deleteOne({ _id: productId });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function editProduct(params: EditProductParams) {
  try {
    connectToDatabase();
    const {
      productId,
      title,
      price,
      discount,
      stock,
      image,
      features,
      description,
      path,
    } = params;
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    product.title = title;
    product.price = price;
    product.discount = discount;
    product.stock = stock;
    product.image = image;
    product.features = features;
    product.description = description;
    await product.save();
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(params: GetProductByIdParams) {
  try {
    connectToDatabase();

    const { productId } = params;

    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    console.log(error);
  }
}
