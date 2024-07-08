import mongoose from "mongoose";
import { Schema, models, model, Document } from "mongoose";

export interface IBrand extends Document {
  title: string;
  linked?: string;
  image: string;
}

const BrandSchema = new Schema({
  title: { type: String, required: true },
  linked: { type: String, required: false },
  image: { type: String, required: true },
});
const Brand = models.Brand || model("Brand", BrandSchema);
export default Brand;
