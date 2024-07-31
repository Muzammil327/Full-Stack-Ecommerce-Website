import mongoose, { Document, Schema } from "mongoose";

interface SMI_CartDocument extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  qty: number;
  size: string;
  createdAt: Date;
}

const SMI_CartSchema = new Schema<SMI_CartDocument>(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    qty: {
      type: Number,
      min: 1,
      default: 1,
    },
    size: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "cart",
  }
);

const cart =
  mongoose.models.cart || mongoose.model("cart", SMI_CartSchema, "cart");

export default cart;
