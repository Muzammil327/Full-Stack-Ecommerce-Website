import mongoose, { Document, Schema } from "mongoose";

interface wishlistsDocument extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
}
const wishlistSchema = new Schema<wishlistsDocument>({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  userId: { type: Schema.Types.ObjectId, ref: "users" },
});

const Wishlist =
  mongoose.models.wishlists ||
  mongoose.model<wishlistsDocument>("wishlists", wishlistSchema);

export default Wishlist;
