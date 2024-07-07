import mongoose, { Document, Schema } from "mongoose";

interface CartsDocument extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  qty: number;
  size: string;
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
  size: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Carts = mongoose.models.Carts || mongoose.model("Carts", cartsSchema);

export default Carts;