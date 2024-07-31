import connectDB from "@/src/utils/db"; // Adjust path as per your project
import platform from "@/src/models/product/platformModel"; // Adjust path as per your project
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, shipping } = await req.json();
  await connectDB();
  try {
    if (!name) {
      return NextResponse.json({
        statusbar: 400,
        error: "Enter Platform Name.",
      });
    }
    if (!shipping) {
      return NextResponse.json({
        statusbar: 400,
        error: "Enter Platform Shipping.",
      });
    }

    await platform.create({ name, shipping });

    return NextResponse.json({
      statusbar: 200,
      message: "Platform successfully Added.",
    });
  } catch (error) {
    console.error("Error verifying add platform:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const get_platform = await platform.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
          shipping: 1,
        },
      },
    ]);

    return NextResponse.json({
      statusbar: 200,
      message: "Platform successfully getting.",
      get_platform,
    });
  } catch (error) {
    console.error("Error getting platform:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const platformId = searchParams.get("platformId");

  await connectDB();
  try {
    if (!platformId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Plantform not found.",
      });
    }

    await platform.findByIdAndDelete(platformId);

    return NextResponse.json({
      statusbar: 200,
      message: "Platform delete successfully",
    });
  } catch (error) {
    console.error("Error verifying platform deleting:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}
