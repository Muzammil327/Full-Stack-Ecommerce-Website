import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the cart item
interface CartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

// Define the interface for the order document
interface OrdersDocument extends Document {
  user: mongoose.Types.ObjectId; // Assuming user ID is stored
  subtotal: number;
  totalTax: number;
  total: number;
  cart: CartItem[];
}

// Define the schema for the order model
const ordersSchema = new Schema<OrdersDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "users", required: true }, // Reference to user model
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    cart: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "products" }, // Reference to product model
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const orders =
  mongoose.models.orders ||
  mongoose.model<OrdersDocument>("orders", ordersSchema);

export default orders;
