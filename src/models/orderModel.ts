import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the cart item
interface CartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

// Define the interface for the order document
interface OrdersDocument extends Document {
  userId: mongoose.Types.ObjectId; // Assuming user ID is stored
  totalPrice: number;
  createdAt: Date;
  productId: CartItem[];
}

// Define the schema for the order model
const ordersSchema = new Schema<OrdersDocument>({
  userId: { type: Schema.Types.ObjectId, ref: "Users" }, // Reference to user model
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  productId: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
      quantity: {
        type: Number,
        min: 1, // Ensure quantity is at least 1
      },
    },
  ],
});

const Orders =
  mongoose.models.Orders ||
  mongoose.model<OrdersDocument>("Orders", ordersSchema);

export default Orders;
