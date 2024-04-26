import mongoose from "mongoose";
import { Schema, models, model, Document } from "mongoose";

export interface ICategory extends Document {
  title: string;
  image: string;
  createdAt: Date;
}

const CategorySchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Category = models.Category || model("Category", CategorySchema);
export default Category;
