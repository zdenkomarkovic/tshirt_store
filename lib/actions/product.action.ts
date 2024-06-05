"use server";

import Product from "@/database/product.model";
import Tag from "@/database/tag.model";
import { revalidatePath } from "@/node_modules/next/cache";
import { connectToDatabase } from "../mongoose";
import {
  CreateProductParams,
  DeleteProductParams,
  EditProductParams,
  GetProductByIdParams,
  ToggleProductParams,
} from "./sharedTypes";

export async function createProduct(params: CreateProductParams) {
  try {
    connectToDatabase();
    const {
      title,
      category,
      // brand,
      price,
      discount,
      stock,
      image,
      features,
      description,
      hidden,
      showOnLandingPage,
      productCode,
      // avaibility,
      metaTitle,
      metaDescription,
      tags,
      path,
    } = params;

    const validTags = tags.filter((tag) => tag && tag.trim());
    console.log("Valid tags:", validTags); // Debugging step

    const newProduct = await Product.create({
      title,
      category,
      // brand,
      price,
      discount,
      stock,
      image,
      features,
      description,
      hidden,
      showOnLandingPage,
      productCode,
      // avaibility,
      metaTitle,
      metaDescription,
      tags: validTags,
    });

    for (const tag of validTags) {
      const existingTag = await Tag.findOne({
        title: { $regex: new RegExp(`^${tag}$`, "i") },
      });
      if (!existingTag) {
        await Tag.create({ title: tag });
      }
    }

    await revalidatePath(path);
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
      category,
      brand,
      price,
      discount,
      stock,
      image,
      features,
      description,
      hidden,
      showOnLandingPage,
      productCode,
      avaibility,
      metaTitle,
      metaDescription,
      tags,
      path,
    } = params;
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    product.title = title;
    product.category = category;
    product.brand = brand;
    product.price = price;
    product.discount = discount;
    product.stock = stock;
    product.image = image;
    product.features = features;
    product.description = description;
    product.hidden = hidden;
    product.showOnLandingPage = showOnLandingPage;
    product.productCode = productCode;
    product.avaibility = avaibility;
    product.metaTitle = metaTitle;
    product.metaDescription = metaDescription;
    product.tags = tags;
    await product.save();
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
export async function toggleProductVisibility(params: ToggleProductParams) {
  try {
    await connectToDatabase();
    const { productId, hidden, path } = params;
    await Product.findByIdAndUpdate(productId, { hidden: !hidden });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
// product.hidden = !hidden;
// await product.save();
// revalidatePath(path);

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
