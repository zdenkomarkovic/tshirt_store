import { Schema, models, model, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  category: Schema.Types.ObjectId;
  // brand: Schema.Types.ObjectId;
  price: number;
  discount: number;
  stock: number;
  image: string;
  features: string;
  description: string;
  hidden: boolean;
  showOnLandingPage: boolean;
  productCode: string;
  // avaibility: string;
  metaTitle: string;
  metaDescription: string;
  tags: Schema.Types.ObjectId[];
  createdAt: Date;
}

const ProductSchema = new Schema({
  title: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  // brand: { type: Schema.Types.ObjectId, ref: "Brand" },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  image: { type: String, required: true },
  features: { type: String, required: false },
  description: { type: String, required: false },
  hidden: { type: Boolean, default: false },
  showOnLandingPage: { type: Boolean, default: false },
  productCode: { type: String, required: false },
  // avaibility: { type: String, required: false },
  metaTitle: { type: String, required: false },
  metaDescription: { type: String, required: false },
  tags: [{ type: String, required: false }],
  createdAt: { type: Date, default: Date.now },
});
const Product = models.Product || model("Product", ProductSchema);
export default Product;
