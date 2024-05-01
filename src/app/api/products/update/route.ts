import User from "@/src/models/userModel";
import connectDB from "@/src/utils/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const { phone, country, city, zipCode, address } = await request.json();

  connectDB();
  const secret = process.env.JWT_SECRET;
  const token = await getToken({
    req: request,
    secret: secret,
    cookieName: "next-auth.session-token",
  });
  try {
    const product = await User.findByIdAndUpdate(token?._id, {
      phone,
      country,
      city,
      zipCode,
      address,
    });
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json({
      message: (error as { message: string }).message,
    });
  }
}
