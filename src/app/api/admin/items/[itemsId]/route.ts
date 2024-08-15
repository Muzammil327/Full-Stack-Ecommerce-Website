import connectDB from "@/src/utils/db";
import item from "@/src/models/product/itemsModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: { itemsId: string } }
) {
  const itemsId = params.itemsId;
  try {
    if (!itemsId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Items ID not found.",
      });
    }
    await connectDB();
    const getItems = await item.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(itemsId),
        },
      },
      {
        $lookup: {
          from: "catgeory", // Ensure this matches the actual collection name
          localField: "catgeoryId",
          foreignField: "_id",
          as: "cat",
        },
      },
      {
        $lookup: {
          from: "subcatgeory", // Ensure this matches the actual collection name
          localField: "subCategoryId",
          foreignField: "_id",
          as: "subcat",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          "cat._id": 1, // Ensure 'name' is a valid field in the 'catgeory' collection
          "cat.name": 1, // Ensure 'name' is a valid field in the 'catgeory' collection
          "subcat._id": 1, // Ensure 'name' is a valid field in the 'catgeory' collection
          "subcat.name": 1, // Ensure 'name' is a valid field in the 'catgeory' collection
        },
      },
    ]);
    const singleItems = getItems[0];
    return NextResponse.json({
      statusbar: 400,
      message: "Get Succcessfully single items",
      singleItems,
    });
  } catch (error) {
    console.error("Error getting items:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}
