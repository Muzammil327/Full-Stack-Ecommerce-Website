import User from "@/src/models/userModel";
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

  try {
    await connectDB();
    const user = await User.findById(token?._id);
    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }
    // console.log(user);
    const cart = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(token?._id),
        },
      },
      {
        $unwind: "$cart",
      },
      {
        $lookup: {
          from: "products",
          localField: "cart.productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $project: {
          cart: {
            _id: "$product._id",
            name: "$product.name",
            basePrice: "$product.basePrice",
          },

          quantity: "$cart.quantity",
        },
      },
    ]);
    console.log(cart);
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
