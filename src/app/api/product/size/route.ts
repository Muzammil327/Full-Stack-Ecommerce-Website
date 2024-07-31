import connectDB from "@/src/utils/db"; // Adjust path as per your project
import size from "@/src/models/product/sizeModel"; // Adjust path as per your project
import { NextRequest, NextResponse } from "next/server";

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
