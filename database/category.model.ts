import mongoose from "mongoose";
import { Schema, models, model, Document } from "mongoose";

export interface ICategory extends Document {
  title: string;
  linked?: string;
  image: string;
  description?: string;
  createdAt: Date;
}

const CategorySchema = new Schema({
  title: { type: String, required: true },
  linked: { type: String, required: false },
  image: { type: String, required: false },
  description: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});
const Category = models.Category || model("Category", CategorySchema);
export default Category;
