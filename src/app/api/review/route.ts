import connectDB from "@/src/utils/db"; // Adjust path as per your project
import Review from "@/src/models/reviewModel"; // Adjust path as per your project
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  const { rating, text, userId, productId } = await req.json();

  await connectDB();
  try {
    if (!text) {
      return NextResponse.json({
        statusbar: 400,
        error: "Enter Review.",
      });
    }
    if (!rating) {
      return NextResponse.json({
        statusbar: 400,
        error: "Enter Star Rating.",
      });
    }
    if (!userId) {
      return NextResponse.json({
        statusbar: 400,
        error: "User not found.",
      });
    }
    if (!productId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Products not found.",
      });
    }

    await new Review({
      rating,
      text,
      userId,
      productId,
    }).save();

    return NextResponse.json({
      statusbar: 200,
      message: "Review successfully",
    });
  } catch (error) {
    console.error("Error verifying review:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const productId = searchParams.get("productId");
  const userId = searchParams.get("userId");
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 3;

  await connectDB();
  try {
    if (productId) {
      if (!productId) {
        return NextResponse.json({
          statusbar: 400,
          error: "Products not found.",
        });
      }

      const get_user_review = await Review.aggregate([
        {
          $match: {
            productId: new mongoose.Types.ObjectId(productId),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user_detail",
          },
        },
        {
          $unwind: "$user_detail",
        },
        {
          $project: {
            _id: 1,
            text: 1,
            rating: 1,
            "user_detail._id": 1,
            "user_detail.username": 1,
            "user_detail.image": 1,
          },
        },
        { $skip: (page - 1) * limit },
        { $limit: limit },
      ]);

      const totalResults = await Review.countDocuments({
        productId: new mongoose.Types.ObjectId(productId),
      });
      const totalPages = Math.ceil(totalResults / limit);

      return NextResponse.json({
        statusbar: 200,
        message: "Review successfully getting.",
        get_user_review,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalResults: totalResults,
          limit: limit,
        },
      });
    }
    if (userId) {
      if (!userId) {
        return NextResponse.json({
          statusbar: 400,
          error: "Users not found.",
        });
      }
      const get_user_review = await Review.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $project: {
            _id: 1,
          },
        },
      ]);
      return NextResponse.json({
        statusbar: 200,
        message: "Review successfully getting.",
        get_user_review,
      });
    }
  } catch (error) {
    console.error("Error verifying review:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const productId = searchParams.get("productId");

  await connectDB();
  try {
    if (!productId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Products not found.",
      });
    }

    await Review.findByIdAndDelete(productId);

    return NextResponse.json({
      statusbar: 200,
      message: "Review delete successfully",
    });
  } catch (error) {
    console.error("Error verifying review deleting:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}
