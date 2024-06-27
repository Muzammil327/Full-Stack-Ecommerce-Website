import connectDB from "@/src/utils/db"; // Adjust path as per your project
import User from "@/src/models/userModel"; // Adjust path as per your project
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get("email");

  await connectDB();
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        statusbar: 400,
        error: "Users not found.",
      });
    }

    return NextResponse.json({
      statusbar: 200,
      message: "Review successfully getting.",
      user,
    });
  } catch (error) {
    console.error("Error verifying review:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}
