import mongoose from "mongoose";
import { Schema, models, model, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  price: number;
  discount: number;
  stock: number;
  image: string;
  features: string;
  description: string;
  createdAt: Date;
}

const ProductSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  image: { type: String, required: true },
  features: { type: String, required: false },
  description: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});
const Product = models.Product || model("Product", ProductSchema);
export default Product;
