import connectDB from "@/src/utils/db"; // Adjust path as per your project
import color from "@/src/models/product/colorModel"; // Adjust path as per your project
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  await connectDB();
  try {
    if (!name) {
      return NextResponse.json({
        statusbar: 400,
        error: "Enter Color Name.",
      });
    }

    await color.create({ name });

    return NextResponse.json({
      statusbar: 200,
      message: "Color successfully Added.",
    });
  } catch (error) {
    console.error("Error verifying add color:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const get_color = await color.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
        },
      },
    ]);

    return NextResponse.json({
      statusbar: 200,
      message: "Color successfully getting.",
      get_color,
    });
  } catch (error) {
    console.error("Error getting Color:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const colorId = searchParams.get("colorId");

  await connectDB();
  try {
    if (!colorId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Color not found.",
      });
    }

    await color.findByIdAndDelete(colorId);

    return NextResponse.json({
      statusbar: 200,
      message: "Color delete successfully",
    });
  } catch (error) {
    console.error("Error verifying Color deleting:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}

export async function PUT(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const colorId = searchParams.get("colorId");

  const { name } = await req.json();

  try {
    if (!colorId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Color not found.",
      });
    }
    await connectDB();
    await color.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(colorId) },
      {
        name,
      },
      { new: true }
    );

    return NextResponse.json({
      statusbar: 200,
      message: "Color successfully Updated.",
    });
  } catch (error) {
    console.error("Error Color updating:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}
