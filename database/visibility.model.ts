import mongoose from "mongoose";
import { Schema, models, model, Document } from "mongoose";

export interface IVisibility extends Document {
  title: string;
  hidden: boolean;
}

const VisibilitySchema = new Schema({
  title: { type: String, required: true },
  hidden: { type: Boolean, default: false },
});
const Visibility = models.Visibility || model("Visibility", VisibilitySchema);
export default Visibility;
