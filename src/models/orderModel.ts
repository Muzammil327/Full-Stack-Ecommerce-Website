import mongoose, { Document, Schema } from "mongoose";

interface SMI_OrderDocument extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  totalPrice: number;
  qty: number;
  size: string;
  color: string;
  createdAt: Date;
  status: string;
}

const SMI_OrderSchema = new Schema<SMI_OrderDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    totalPrice: {
      type: Number,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    qty: {
      type: Number,
      min: 1,
      default: 1,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled", "No Return"],
      default: "Pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "order",
  }
);

const order =
  mongoose.models.order ||
  mongoose.model<SMI_OrderDocument>("order", SMI_OrderSchema, "order");

export default order;
