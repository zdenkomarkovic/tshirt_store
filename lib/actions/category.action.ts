"use server";

import Category from "@/database/category.model";
import { revalidatePath } from "@/node_modules/next/cache";
import { connectToDatabase } from "../mongoose";
import {
  CreateCategoryParams,
  DeleteCategoryParams,
  EditCategoryParams,
  GetCategoryByIdParams,
} from "./sharedTypes";

export async function createCategory(params: CreateCategoryParams) {
  try {
    connectToDatabase();
    const { title, linked, image, description, path } = params;
    const newCategory = await Category.create({
      title,
      linked,
      image,
      description,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
export async function getCategories() {
  try {
    connectToDatabase();
    const categories = await Category.find();
    return categories;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCategory(params: DeleteCategoryParams) {
  try {
    connectToDatabase();
    const { categoryId, path } = params;
    await Category.deleteOne({ _id: categoryId });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function editCategory(params: EditCategoryParams) {
  try {
    connectToDatabase();
    const { categoryId, title, linked, image, description, path } = params;
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }
    category.title = title;
    category.linked = linked;
    category.image = image;
    category.description = description;
    await category.save();
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getCategoryById(params: GetCategoryByIdParams) {
  try {
    connectToDatabase();

    const { categoryId } = params;

    const category = await Category.findById(categoryId);
    return category;
  } catch (error) {
    console.log(error);
  }
}
