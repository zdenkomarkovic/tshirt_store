import mongoose from "mongoose";
import { Schema, models, model, Document } from "mongoose";

export interface ISlider extends Document {
  title?: string;
  subtitle?: string;
  image: string;
  link?: string;
  createdAt: Date;
}

const SliderSchema = new Schema({
  title: { type: String, required: false },
  subtitle: { type: String, required: false },
  image: { type: String, required: true },
  link: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});
const Slider = models.Slider || model("Slider", SliderSchema);
export default Slider;
