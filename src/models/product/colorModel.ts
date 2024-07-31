import mongoose, { Document, Schema } from "mongoose";

interface SMI_ColorDocument extends Document {
  name: string;
}

const SMI_ColorSchema = new Schema<SMI_ColorDocument>(
  {
    name: {
      type: String,
      lowercase: true,
      required: true,
    },
  },
  {
    collection: "color",
  }
);

const color =
  mongoose.models.color ||
  mongoose.model<SMI_ColorDocument>("color", SMI_ColorSchema, "color");

export default color;
