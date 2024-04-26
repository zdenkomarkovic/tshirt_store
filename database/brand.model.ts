import mongoose from "mongoose";
import { Schema, models, model, Document } from "mongoose";

export interface IBrand extends Document {
  title: string;
  image: string;
  createdAt: Date;
}

const BrandSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Brand = models.Brand || model("Brand", BrandSchema);
export default Brand;
