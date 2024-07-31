import connectDB from "@/src/utils/db"; // Adjust path as per your project
import item from "@/src/models/product/itemsModel"; // Adjust path as per your project
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  const { name, catgeoryId, subCatgeoryId } = await req.json();
  await connectDB();
  try {
    if (!name) {
      return NextResponse.json({
        statusbar: 400,
        error: "Enter Platform Name.",
      });
    }
    if (!catgeoryId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Enter Catgeory Name.",
      });
    }
    if (!subCatgeoryId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Enter Sub Catgeory Name.",
      });
    }

    await item.create({
      name,
      catgeoryId,
      subCategoryId: subCatgeoryId,
    });

    return NextResponse.json({
      statusbar: 200,
      message: "Items successfully Added.",
    });
  } catch (error) {
    console.error("Error verifying add items:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const get_item = await item.aggregate([
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

    return NextResponse.json({
      statusbar: 200,
      message: "Items successfully getting.",
      get_item,
    });
  } catch (error) {
    console.error("Error getting items:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const itemsId = searchParams.get("itemsId");

  await connectDB();
  try {
    if (!itemsId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Items Id not found.",
      });
    }

    await item.findByIdAndDelete(itemsId);

    return NextResponse.json({
      statusbar: 200,
      message: "Items Id delete successfully",
    });
  } catch (error) {
    console.error("Error verifying itemsId deleting:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}
