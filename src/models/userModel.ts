import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface UsersDocument extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
}
const usersSchema = new Schema<UsersDocument>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
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
