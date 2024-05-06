import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import User from "../models/userModel"; // Import your User model
import { NextRequest } from "next/server";

export async function authenticateUser(req: any) {
  const secret = process.env.JWT_SECRET;
  const token = await getToken({
    req: req,
    secret: secret,
    cookieName: "next-auth.session-token",
  });

  if (token) {
    const user = await User.findById(token._id);
    return user;
  } else {
    return null;
  }
}
