import connectDB from "@/src/utils/db";
import catgeory from "@/src/models/product/catgeoryModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: { catgeoryId: string } }
) {
  const catgeoryId = params.catgeoryId;
  try {
    if (!catgeoryId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Catgeory ID not found.",
      });
    }
    await connectDB();
    const getCatgeory = await catgeory.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(catgeoryId),
        },
      },
    ]);
    const singleCatgeory = getCatgeory[0];
    return NextResponse.json({
      statusbar: 400,
      message: "Get Succcessfully single catgeory",
      singleCatgeory,
    });
  } catch (error) {
    console.error("Error getting catgeory:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}
