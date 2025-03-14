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
  GetProductsParams,
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

    await Product.create({
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
export async function getProducts(params: GetProductsParams) {
  try {
    connectToDatabase();
    const { filter } = params;

    let sortOptions = {};
    switch (filter) {
      case "mostViewed":
        sortOptions = { views: -1 };
        break;
      case "regular":
        sortOptions = { createdAt: 1 };
        break;
    }

    const products = await Product.find().sort(sortOptions);
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

    const product = await Product.findByIdAndUpdate(
      productId,
      {
        $inc: { views: 1 },
      },
      { new: true },
    );
    if (!product) throw new Error("Product not found");
    return {
      ...product.toObject(), // Pretvori proizvod u plain JavaScript objekat
      _id: product._id.toString(), // Konvertujte _id u string
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}
