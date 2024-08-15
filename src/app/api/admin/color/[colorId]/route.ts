import connectDB from "@/src/utils/db";
import color from "@/src/models/product/colorModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: { colorId: string } }
) {
  const colorId = params.colorId;
  try {
    if (!colorId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Color not found.",
      });
    }
    await connectDB();
    const getColor = await color.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(colorId),
        },
      },
    ]);
    const singleColor = getColor[0];
    return NextResponse.json({
      statusbar: 400,
      message: "Get Succcessfully single color",
      singleColor,
    });
  } catch (error) {
    console.error("Error getting order item by user:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}
