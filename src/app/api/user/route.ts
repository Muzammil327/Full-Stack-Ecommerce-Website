import connectDB from "@/src/utils/db";
import cart from "@/src/models/cartModel";
import order from "@/src/models/orderModel";
import wishlist from "@/src/models/wishlistModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import review from "@/src/models/reviewModel";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  try {
    await connectDB();
    const validUserId = userId ?? "";
    const get_user_cart_count = await cart.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(validUserId),
        },
      },
      { $count: "count" },
    ]);

    const get_user_order_count = await order.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(validUserId),
        },
      },
      { $count: "count" },
    ]);

    const get_user_review_count = await review.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(validUserId),
        },
      },
      { $count: "count" },
    ]);
    const get_user_wishlist_count = await wishlist.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(validUserId),
        },
      },
      { $count: "count" },
    ]);

    return NextResponse.json({
      status: 200,
      message: "user data retrieved successfully.",
      counts: {
        cart: get_user_cart_count[0]?.count || 0,
        order: get_user_order_count[0]?.count || 0,
        review: get_user_review_count[0]?.count || 0,
        wishlist: get_user_wishlist_count[0]?.count || 0,
      },
    });
  } catch (error) {
    console.error("Error retrieving admin data:", error);
    return NextResponse.json({
      status: 500,
      error: "Internal Server Error",
    });
  }
}
