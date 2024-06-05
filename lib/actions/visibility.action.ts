"use server";

import Visibility from "@/database/visibility.model";
import { revalidatePath } from "@/node_modules/next/cache";
import { connectToDatabase } from "../mongoose";
import {
  CreateVisibilityParams,
  DeleteVisibilityParams,
  ToggleVisibilityParams,
} from "./sharedTypes";

export async function createVisibility(params: CreateVisibilityParams) {
  try {
    connectToDatabase();
    const { title, hidden, path } = params;
    const newVisibility = await Visibility.create({
      title,
      hidden,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
export async function getVisibility() {
  try {
    connectToDatabase();
    const visibility = await Visibility.find();
    return visibility;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteVisibility(params: DeleteVisibilityParams) {
  try {
    connectToDatabase();
    const { visibilityId, path } = params;
    await Visibility.deleteOne({ _id: visibilityId });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function toggleVisibility(params: ToggleVisibilityParams) {
  try {
    await connectToDatabase();
    const { visibilityId, hidden, path } = params;
    await Visibility.findByIdAndUpdate(visibilityId, { hidden: !hidden });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
