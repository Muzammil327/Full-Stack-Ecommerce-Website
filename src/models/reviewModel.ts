import mongoose, { Document, Schema } from "mongoose";

interface reviewsDocument extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  rating: number;
  text: string;
  createdAt: Date;
  like: mongoose.Schema.Types.ObjectId;
  dislike: mongoose.Schema.Types.ObjectId;
}
const reviewsSchema = new Schema<reviewsDocument>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
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
});

const Review =
  mongoose.models.reviews ||
  mongoose.model<reviewsDocument>("reviews", reviewsSchema);

export default Review;
