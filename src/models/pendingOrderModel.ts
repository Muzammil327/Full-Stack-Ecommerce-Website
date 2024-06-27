import mongoose, { Document, Schema } from "mongoose";

interface PendingOrdersDocument extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  qty: number;
}
const pendingOrdersSchema = new Schema<PendingOrdersDocument>({
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  qty: {
    type: Number,
    min: 1,
    default: 1,
  },
});

const PendingOrder =
  mongoose.models.pendingOrders ||
  mongoose.model<PendingOrdersDocument>("pendingOrders", pendingOrdersSchema);

export default PendingOrder;
