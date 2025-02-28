"use server";

import Brand from "@/database/brand.model";
import { revalidatePath } from "@/node_modules/next/cache";
import { connectToDatabase } from "../mongoose";
import {
  CreateBrandParams,
  DeleteBrandParams,
  EditBrandParams,
  GetBrandByIdParams,
} from "./sharedTypes";

export async function createBrand(params: CreateBrandParams) {
  console.log(params);

  try {
    connectToDatabase();
    const { title, image, path } = params;
    const newBrand = await Brand.create({
      title,
      image,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
export async function getBrands() {
  try {
    connectToDatabase();
    const brands = await Brand.find();
    return brands;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteBrand(params: DeleteBrandParams) {
  try {
    connectToDatabase();
    const { brandId, path } = params;
    await Brand.deleteOne({ _id: brandId });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function editBrand(params: EditBrandParams) {
  try {
    connectToDatabase();
    const { brandId, title, image, path } = params;
    const brand = await Brand.findById(brandId);
    if (!brand) {
      throw new Error("Brand not found");
    }
    brand.title = title;
    brand.image = image;
    await Brand.save();
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getBrandById(params: GetBrandByIdParams) {
  try {
    connectToDatabase();

    const { brandId } = params;

    const brand = await Brand.findById(brandId);
    return brand;
  } catch (error) {
    console.log(error);
  }
}
