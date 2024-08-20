import connectDB from "@/src/utils/db"; // Adjust path as per your project
import order from "@/src/models/orderModel"; // Adjust path as per your project
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;

  try {
    if (!userId) {
      return NextResponse.json({
        statusbar: 400,
        error: "User not found.",
      });
    }
    await connectDB();
    const get_user_order = await order.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "product", // Name of the collection to join with
          localField: "productId", // Field in the Carts collection
          foreignField: "_id", // Field in the Products collection
          as: "product", // Alias for the joined data
        },
      },
      {
        $unwind: "$product",
      },
      {
        $project: {
          _id: 1,
          totalPrice: 1,
          status: 1,
          size: 1,
          color: 1,
          createdAt: 1,
          "product.image": 1,
          "product.name": 1,
        },
      },
    ]);

    return NextResponse.json({
      statusbar: 200,
      message: "Order successfully getting.",
      get_user_order,
    });
  } catch (error) {
    console.error("Error getting order item by user:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}
