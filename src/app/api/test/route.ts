import connectDB from "@/src/utils/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/userModel";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({
      req: req,
      secret: process.env.JWT_SECRET,
      cookieName: "next-auth.session-token",
    });

    await connectDB();
    const user = await User.findById(token?._id);

    if (user) {
      return NextResponse.json({ error: "User found" });
    } else {
      return NextResponse.json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      error: "Error Product",
    });
  }
}
