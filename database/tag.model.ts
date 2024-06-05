import { Schema, model, models, Document } from "mongoose";

export interface ITag extends Document {
  title: string;
}

const TagSchema = new Schema<ITag>({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1, // Ensure that the title is at least one character long
  },
});

const Tag = models.Tag || model<ITag>("Tag", TagSchema);

export default Tag;
