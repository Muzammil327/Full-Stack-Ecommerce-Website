import mongoose, { Document, Schema } from "mongoose";

interface SMI_ReviewDocument extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  rating: number;
  text: string;
  createdAt: Date;
  like: mongoose.Schema.Types.ObjectId;
  dislike: mongoose.Schema.Types.ObjectId;
}

const SMI_ReviewSchema = new Schema<SMI_ReviewDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    rating: { type: Number, required: true },
    text: { type: String },
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: "review",
  }
);

const review =
  mongoose.models.review ||
  mongoose.model<SMI_ReviewDocument>("review", SMI_ReviewSchema, "review");

export default review;
