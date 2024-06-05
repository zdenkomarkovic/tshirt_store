"use server";

import Colection from "@/database/colection.model";
import { revalidatePath } from "@/node_modules/next/cache";
import { connectToDatabase } from "../mongoose";
import {
  CreateColectionParams,
  DeleteColectionParams,
  EditColectionParams,
  GetColectionByIdParams,
} from "./sharedTypes";

export async function createColection(params: CreateColectionParams) {
  try {
    connectToDatabase();
    const { title, subtitle, image, link, path } = params;
    const newColection = await Colection.create({
      title,
      subtitle,
      image,
      link,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
export async function getColections() {
  try {
    connectToDatabase();
    const colections = await Colection.find();
    return colections;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteColection(params: DeleteColectionParams) {
  try {
    connectToDatabase();
    const { colectionId, path } = params;
    await Colection.deleteOne({ _id: colectionId });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function editColection(params: EditColectionParams) {
  try {
    connectToDatabase();
    const { colectionId, title, subtitle, image, link, path } = params;
    const colection = await Colection.findById(colectionId);
    if (!colection) {
      throw new Error("Colection not found");
    }
    colection.title = title;
    colection.subtitle = subtitle;
    colection.image = image;
    colection.link = link;
    await colection.save();
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getColectionById(params: GetColectionByIdParams) {
  try {
    connectToDatabase();

    const { colectionId } = params;

    const colection = await Colection.findById(colectionId);
    return colection;
  } catch (error) {
    console.log(error);
  }
}
