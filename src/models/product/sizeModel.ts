import mongoose, { Document, Schema } from "mongoose";

interface SMI_SizeDocument extends Document {
  name: string;
}
const SMI_SizeSchema = new Schema<SMI_SizeDocument>(
  {
    name: {
      type: String,
      lowercase: true,
      required: true,
    },
  },
  {
    collection: "size",
  }
);

const size =
  mongoose.models.size ||
  mongoose.model<SMI_SizeDocument>("size", SMI_SizeSchema, "size");

export default size;
