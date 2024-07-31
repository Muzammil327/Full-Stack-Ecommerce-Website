import mongoose, { Document, Schema } from "mongoose";

interface SMI_PendingorderDocument extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  qty: number;
}

const SMI_PendingorderSchema = new Schema<SMI_PendingorderDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    qty: {
      type: Number,
      min: 1,
      default: 1,
    },
  },
  {
    collection: "pendingorder",
  }
);

const pendingorder =
  mongoose.models.pendingorder ||
  mongoose.model<SMI_PendingorderDocument>(
    "pendingorder",
    SMI_PendingorderSchema,
    "pendingorder"
  );

export default pendingorder;
