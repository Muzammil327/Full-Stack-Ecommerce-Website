import connectDB from "@/src/utils/db"; // Adjust path as per your project
import subcatgeory from "@/src/models/product/subCatgeoryModel"; // Adjust path as per your project
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, catgeoryId } = await req.json();
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

    await subcatgeory.create({ name, catgeoryId });

    return NextResponse.json({
      statusbar: 200,
      message: "Sub Catgeory successfully Added.",
    });
  } catch (error) {
    console.error("Error verifying add sub catgeory:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const get_subcatgeory = await subcatgeory.aggregate([
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

    return NextResponse.json({
      statusbar: 200,
      message: "Sub Catgeory successfully getting.",
      get_subcatgeory,
    });
  } catch (error) {
    console.error("Error getting SubCatgeory:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}

// subcatgeoryId

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const subcatgeoryId = searchParams.get("subcatgeoryId");

  await connectDB();
  try {
    if (!subcatgeoryId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Sub Catgeory not found.",
      });
    }

    await subcatgeory.findByIdAndDelete(subcatgeoryId);

    return NextResponse.json({
      statusbar: 200,
      message: "Sub Catgeory delete successfully",
    });
  } catch (error) {
    console.error("Error verifying Sub Catgeory deleting:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}
