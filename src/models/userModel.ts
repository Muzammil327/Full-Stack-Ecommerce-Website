import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface OrderItem {
  userId: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId;
  totalPrice: number;
  quantity: number;
}
interface CartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

interface UserModelDocument extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  Pendingorders: OrderItem[];
  cart: CartItem[];
  country: string;
  city: string;
  zipCode: string;
  address: string;
  phone: string;
}
const userModelSchema = new Schema<UserModelDocument>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    country: { type: String, default: "" },
    city: { type: String, default: "" },
    zipCode: { type: String, default: "" },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    cart: [
      {
        _id: false,
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
    Pendingorders: [{ type: Schema.Types.ObjectId, ref: "OrderModel" }], // Reference to orders
  },
  { timestamps: true }
);

// Method to compare passwords for login
userModelSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// Pre-save hook to hash password before saving
userModelSchema.pre<UserModelDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const UserModel =
  mongoose.models.UserModel ||
  mongoose.model<UserModelDocument>("UserModel", userModelSchema);

export default UserModel;
