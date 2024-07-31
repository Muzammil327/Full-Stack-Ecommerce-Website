import mongoose, { Document, Schema } from "mongoose";

interface SMI_WishlistDocument extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
}
const SMI_WishlistSchema = new Schema<SMI_WishlistDocument>(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    userId: { type: Schema.Types.ObjectId, ref: "user" },
  },
  {
    collection: "wishlist",
  }
);

const wishlist =
  mongoose.models.wishlist ||
  mongoose.model<SMI_WishlistDocument>(
    "wishlist",
    SMI_WishlistSchema,
    "wishlist"
  );

export default wishlist;
