import connectDB from "@/src/utils/db"; // Adjust path as per your project
import user from "@/src/models/userModel"; // Adjust path as per your project
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  const token = params.token;
  try {
    if (!token) {
      return NextResponse.json({
        statusbar: 400,
        error: "User not found or verification token invalid",
      });
    }
    await connectDB();
    await user.findOneAndUpdate(
      { tokenActivate: token },
      { $set: { emailVerified: true }, $unset: { tokenActivate: "" } }, // Remove tokenActivate field
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
