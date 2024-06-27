import mongoose, { Document, Schema } from "mongoose";

interface OrdersDocument extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  totalPrice: number;
  qty: number;
  createdAt: Date;
  status: string;
}
const ordersSchema = new Schema<OrdersDocument>({
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  totalPrice: {
    type: Number,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  qty: {
    type: Number,
    min: 1,
    default: 1,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order =
  mongoose.models.orders ||
  mongoose.model<OrdersDocument>("orders", ordersSchema);

export default Order;
