import mongoose, { Document, Schema } from "mongoose";

interface CartsDocument extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  qty: number;
  createdAt: Date;
}
const cartsSchema = new Schema<CartsDocument>({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  qty: {
    type: Number,
    min: 1,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Cart =
  mongoose.models.carts || mongoose.model<CartsDocument>("carts", cartsSchema);

export default Cart;
