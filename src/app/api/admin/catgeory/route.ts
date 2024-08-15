import connectDB from "@/src/utils/db"; // Adjust path as per your project
import catgeory from "@/src/models/product/catgeoryModel"; // Adjust path as per your project
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  await connectDB();
  try {
    if (!name) {
      return NextResponse.json({
        statusbar: 400,
        error: "Enter Catgeory Name.",
      });
    }
    await catgeory.create({ name });

    return NextResponse.json({
      statusbar: 200,
      message: "Catgeory successfully Added.",
    });
  } catch (error) {
    console.error("Error verifying add catgeory:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const get_catgeory = await catgeory.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
        },
      },
    ]);
    return NextResponse.json({
      statusbar: 200,
      message: "Catgeory successfully getting.",
      get_catgeory,
    });
  } catch (error) {
    console.error("Error getting Catgeory:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const catgeoryId = searchParams.get("catgeoryId");

  await connectDB();
  try {
    if (!catgeoryId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Catgeory Id not found.",
      });
    }

    await catgeory.findByIdAndDelete(catgeoryId);

    return NextResponse.json({
      statusbar: 200,
      message: "Catgeory Id delete successfully",
    });
  } catch (error) {
    console.error("Error verifying Catgeory Id deleting:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}

export async function PUT(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const catgeoryId = searchParams.get("catgeoryId");

  const { name } = await req.json();

  try {
    if (!catgeoryId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Catgeory not found.",
      });
    }
    await connectDB();
    await catgeory.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(catgeoryId) },
      {
        name,
      },
      { new: true }
    );

    return NextResponse.json({
      statusbar: 200,
      message: "Catgeory successfully Updated.",
    });
  } catch (error) {
    console.error("Error Catgeory updating:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}
