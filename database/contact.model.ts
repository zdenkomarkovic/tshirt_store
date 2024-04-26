import mongoose from "mongoose";
import { Schema, models, model, Document } from "mongoose";

export interface IContactMessage extends Document {
  title: string;
  image: string;
  createdAt: Date;
}

const ContactMessageSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const ContactMessage =
  models.ContactMessage || model("ContactMessage", ContactMessageSchema);
export default ContactMessage;
