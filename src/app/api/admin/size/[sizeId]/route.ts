import connectDB from "@/src/utils/db"; // Adjust path as per your project
import size from "@/src/models/product/sizeModel"; // Adjust path as per your project
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: { sizeId: string } }
) {
  const sizeId = params.sizeId;
  try {
    if (!sizeId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Product not found.",
      });
    }
    await connectDB();
    const getSize = await size.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(sizeId),
        },
      },
    ]);
    const singleSize = getSize[0];
    return NextResponse.json({
      statusbar: 400,
      message: "Get Succcessfully single size",
      singleSize
    });
  } catch (error) {
    console.error("Error getting order item by user:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}
