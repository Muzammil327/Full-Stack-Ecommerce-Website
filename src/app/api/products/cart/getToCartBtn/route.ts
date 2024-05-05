import User from "@/src/models/userModel";
import CartModel from "@/src/models/cartModel";
import connectDB from "@/src/utils/db";
import mongoose from "mongoose";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const secret = process.env.JWT_SECRET;
  const token = await getToken({
    req: req,
    secret: secret,
    cookieName: "next-auth.session-token",
  });
console.log(token)
  try {
    await connectDB();
    const user = await User.findById(token?._id);
    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }
    const cart = await CartModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(token?._id),
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          quantity: 1,
          price: 1,
          image: 1,
        },
      },
    ]);
    return NextResponse.json({
      success: true,
      cart: cart,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Error fetching user's cart",
    });
  }
}
