import connectDB from "@/src/utils/db"; // Adjust path as per your project
import wishlist from "@/src/models/wishlistModel"; // Adjust path as per your project
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  try {
    if (!userId) {
      return NextResponse.json({
        statusbar: 400,
        error: "User not found.",
      });
    }
    await connectDB();
    const get_user_wishlist = await wishlist.aggregate([
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
          as: "product_Detail", // Alias for the joined data
        },
      },
      {
        $unwind: "$product_Detail",
      },
      {
        $project: {
          _id: 1,
          "product_Detail.image": 1,
          "product_Detail.price": 1,
          "product_Detail.name": 1,
          "product_Detail.slug": 1,
        },
      },
    ]);

    return NextResponse.json({
      statusbar: 200,
      message: "Wishlist successfully.",
      get_user_wishlist,
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}

export async function POST(req: NextRequest) {
  const { productId, userId } = await req.json();
  await connectDB();
  try {
    if (!productId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Product Id is Required.",
      });
    }
    if (!userId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Login is Required.",
      });
    }
    const checkWishlist = await wishlist.findOne({ productId, userId });

    if (checkWishlist) {
      return NextResponse.json({
        statusbar: 200,
        message: "Already in Wishlist.",
      });
    } else {
      const newWishList = new wishlist({
        productId,
        userId,
      });
      await newWishList.save();
      return NextResponse.json({
        statusbar: 200,
        message: "New Items added in wishlist!",
      });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Error Registering",
    });
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const wishlistId = searchParams.get("wishlistId");
  await connectDB();

  try {
    if (!wishlistId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Wishlist Id is Required.",
      });
    }
    const deletedWishlist = await wishlist.findByIdAndDelete({
      _id: wishlistId,
    });

    return NextResponse.json({
      statusbar: 200,
      message: "Item delete from Wishlist!",
      deletedWishlist,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Error Registering",
    });
  }
}
