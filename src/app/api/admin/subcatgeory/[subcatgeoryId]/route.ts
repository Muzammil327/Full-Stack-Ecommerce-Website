import connectDB from "@/src/utils/db";
import subcatgeory from "@/src/models/product/subCatgeoryModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: { subcatgeoryId: string } }
) {
  const subcatgeoryId = params.subcatgeoryId;
  try {
    if (!subcatgeoryId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Sub Catgeory ID not found.",
      });
    }
    await connectDB();
    const getSubCatgeory = await subcatgeory.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(subcatgeoryId),
        },
      },
      {
        $lookup: {
          from: "catgeory", // Change this to the correct collection name if it's different
          localField: "catgeoryId",
          foreignField: "_id",
          as: "cat", // Name of the field to store the related products
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          "cat.name": 1,
          "cat._id": 1,
        },
      },
    ]);
    const singleSubCatgeory = getSubCatgeory[0];
    return NextResponse.json({
      statusbar: 400,
      message: "Get Succcessfully single sub catgeory",
      singleSubCatgeory,
    });
  } catch (error) {
    console.error("Error getting sub catgeory:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}
