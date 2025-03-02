import mongoose from "mongoose";
import { Schema, models, model, Document } from "mongoose";

export interface IArticle extends Document {
  productId: Schema.Types.ObjectId;
  title: string;
  price: number;
  quantity: number;
}
export interface IOrder extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
  city: string;
  products: Schema.Types.ObjectId[];
  createdAt: Date;
}

const ArticleSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false },
);

const OrderSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  zipCode: { type: String, required: true },
  city: { type: String, required: true },
  products: {
    type: [ArticleSchema],
    validate: {
      validator: (product: any) => {
        return product.length > 0;
      },
      message: "Not allowed 0 products!",
    },
  },
  createdAt: { type: Date, default: Date.now },
});
const Order = models.Order || model("Order", OrderSchema);
export default Order;
