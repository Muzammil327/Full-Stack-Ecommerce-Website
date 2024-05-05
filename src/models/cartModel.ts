import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the order document
interface CartsDocument extends Document {
  user: mongoose.Types.ObjectId; // Assuming user ID is stored
  products: mongoose.Types.ObjectId; // Assuming user ID is stored
  quantity: number;
  price?: number;
  name?: string;
  image?: string;
}

// Define the schema for the order model
const cartsSchema = new Schema<CartsDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "users" }, // Reference to user model
    products: { type: Schema.Types.ObjectId, ref: "products" }, // Reference to user model
    name: {
      type: String,
      unique: true,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const CartModel =
  mongoose.models.CartModel ||
  mongoose.model<CartsDocument>("CartModel", cartsSchema);

export default CartModel;
