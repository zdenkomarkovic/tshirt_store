import mongoose from "mongoose";
import { Schema, models, model, Document } from "mongoose";

export interface IColection extends Document {
  title?: string;
  subtitle?: string;
  image: string;
  link?: string;
  createdAt: Date;
}

const ColectionSchema = new Schema({
  title: { type: String, required: false },
  subtitle: { type: String, required: false },
  image: { type: String, required: true },
  link: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});
const Colection = models.Colection || model("Colection", ColectionSchema);
export default Colection;
