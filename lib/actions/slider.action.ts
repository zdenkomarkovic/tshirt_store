"use server";

import Slider from "@/database/slider.model";
import { revalidatePath } from "@/node_modules/next/cache";
import { connectToDatabase } from "../mongoose";
import {
  CreateSliderParams,
  DeleteSliderParams,
  EditSliderParams,
  GetSliderByIdParams,
} from "./sharedTypes";

export async function createSlider(params: CreateSliderParams) {
  try {
    connectToDatabase();
    const { title, subtitle, image, link, path } = params;
    await Slider.create({
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
export async function getSliders() {
  try {
    connectToDatabase();
    const sliders = await Slider.find();
    return sliders;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSlider(params: DeleteSliderParams) {
  try {
    connectToDatabase();
    const { sliderId, path } = params;
    await Slider.deleteOne({ _id: sliderId });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function editSlider(params: EditSliderParams) {
  try {
    connectToDatabase();
    const { sliderId, title, subtitle, image, link, path } = params;
    const slider = await Slider.findById(sliderId);
    if (!slider) {
      throw new Error("Slider not found");
    }
    slider.title = title;
    slider.subtitle = subtitle;
    slider.image = image;
    slider.link = link;
    await slider.save();
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getSliderById(params: GetSliderByIdParams) {
  try {
    connectToDatabase();

    const { sliderId } = params;

    const slider = await Slider.findById(sliderId);
    return slider;
  } catch (error) {
    console.log(error);
  }
}
