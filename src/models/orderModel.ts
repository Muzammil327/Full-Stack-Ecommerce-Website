import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the cart item
interface CartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

// Define the interface for the order document
interface OrderDocument extends Document {
  user: mongoose.Types.ObjectId; // Assuming user ID is stored
  subtotal: number;
  totalTax: number;
  total: number;
  cart: CartItem[];
}

// Define the schema for the order model
const orderSchema = new Schema<OrderDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "UserModel", required: true }, // Reference to user model
    subtotal: { type: Number, required: true },
    totalTax: { type: Number, required: true },
    total: { type: Number, required: true },
    cart: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" }, // Reference to product model
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

// Create and export the Order model
const OrderModel = mongoose.model<OrderDocument>("OrderModel", orderSchema);
export default OrderModel;
