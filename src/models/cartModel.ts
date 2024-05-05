import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the order document
interface CartsDocument extends Document {
  userId: mongoose.Types.ObjectId; // Assuming user ID is stored
  productId: mongoose.Types.ObjectId; // Assuming user ID is stored
  quantity: number;
  createdAt: Date;
}

// Define the schema for the order model
const cartsSchema = new Schema<CartsDocument>(
  {
    // Reference to Products model
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
    // Reference to Users model
    userId: { type: Schema.Types.ObjectId, ref: "Users" },
    quantity: {
      type: Number,
      min: 1,
      default: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Carts =
  mongoose.models.Carts || mongoose.model<CartsDocument>("Carts", cartsSchema);

export default Carts;
