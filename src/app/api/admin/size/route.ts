import connectDB from "@/src/utils/db";
import size from "@/src/models/product/sizeModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  await connectDB();
  try {
    if (!name) {
      return NextResponse.json({
        statusbar: 400,
        error: "Enter Size Name.",
      });
    }

    await size.create({ name });

    return NextResponse.json({
      statusbar: 200,
      message: "Size successfully Added.",
    });
  } catch (error) {
    console.error("Error verifying add size:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const get_size = await size.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
        },
      },
    ]);

    return NextResponse.json({
      statusbar: 200,
      message: "Size successfully getting.",
      get_size,
    });
  } catch (error) {
    console.error("Error getting Size:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const sizeId = searchParams.get("sizeId");

  await connectDB();
  try {
    if (!sizeId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Size not found.",
      });
    }

    await size.findByIdAndDelete(sizeId);

    return NextResponse.json({
      statusbar: 200,
      message: "Size delete successfully",
    });
  } catch (error) {
    console.error("Error verifying Size deleting:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}

export async function PUT(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const sizeId = searchParams.get("sizeId");

  const { name } = await req.json();

  try {
    if (!sizeId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Size not found.",
      });
    }
    await connectDB();
    await size.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(sizeId) },
      {
        name,
      },
      { new: true }
    );

    return NextResponse.json({
      statusbar: 200,
      message: "Size successfully Updated.",
    });
  } catch (error) {
    console.error("Error size updating:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}
