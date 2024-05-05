import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface OrderItem {
  userId: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId;
  totalPrice: number;
  quantity: number;
}

interface UsersDocument extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  orders: OrderItem[];
  cart: [];
  country: string;
  city: string;
  zipCode: string;
  address: string;
  phone: string;
}
const usersSchema = new Schema<UsersDocument>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  country: { type: String, default: "" },
  city: { type: String, default: "" },
  zipCode: { type: String, default: "" },
  address: { type: String, default: "" },
  phone: { type: String, default: "" },
  cart: [{ type: Schema.Types.ObjectId, ref: "Carts" }],
  orders: [{ type: Schema.Types.ObjectId, ref: "Orders" }],
});

// Method to compare passwords for login
usersSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// Pre-save hook to hash password before saving
usersSchema.pre<UsersDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Users =
  mongoose.models.Users || mongoose.model<UsersDocument>("Users", usersSchema);

export default Users;
