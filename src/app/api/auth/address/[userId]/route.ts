import connectDB from "@/src/utils/db";
import user from "@/src/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;
  const {
    phone1,
    phone2,
    addressLine,
    province,
    additionalInfo,
    country,
    city,
    postalCode,
  } = await req.json();

  try {
    if (!userId) {
      return NextResponse.json({
        statusbar: 400,
        error: "User not found.",
      });
    }
    await connectDB();
    await user.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId) },
      {
        phone1,
        phone2,
        addressLine,
        province,
        additionalInfo,
        country,
        city,
        postalCode,
      },
      { new: true }
    );

    return NextResponse.json({
      statusbar: 200,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;
  try {
    if (!userId) {
      return NextResponse.json({
        statusbar: 400,
        error: "User not found.",
      });
    }
    await connectDB();
    const get_user_address = await user.findById(
      new mongoose.Types.ObjectId(userId)
    );

    return NextResponse.json({
      statusbar: 200,
      message: "Email verified successfully",
      get_user_address,
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}
