"use server";

import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";

export async function getTags() {
  try {
    connectToDatabase();
    const tags = await Tag.find();
    return tags;
  } catch (error) {
    console.log(error);
  }
}
