import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface UsersDocument extends Document {
  image: string;
  username: string;
  email: string;
  password: string;
  role: string;
  emailVerified: boolean;
  tokenActivate: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
  phone1: string;
  phone2: string;
  additionalInfo: string;
  createdAt: Date;
}
const usersSchema = new Schema<UsersDocument>({
  image: { type: String },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  tokenActivate: { type: String },
  emailVerified: { type: Boolean, default: false },
  addressLine1: { type: String },
  addressLine2: { type: String },
  city: { type: String },
  postalCode: { type: String },
  country: { type: String },
  phone1: { type: String },
  phone2: { type: String },
  additionalInfo: { type: String },
  createdAt: { type: Date, default: Date.now },
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

const User =
  mongoose.models.users || mongoose.model<UsersDocument>("users", usersSchema);

export default User;
