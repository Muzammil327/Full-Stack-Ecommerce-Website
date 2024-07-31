import connectDB from "@/src/utils/db"; // Adjust path as per your project
import user from "@/src/models/userModel"; // Adjust path as per your project
import { NextRequest, NextResponse } from "next/server";
import { sendActivationEmail } from "@/src/utils/email";

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const token = searchParams.get("token");

  try {
    if (!token) {
      return NextResponse.json({
        statusbar: 400,
        error: "User not found or verification token invalid",
      });
    }
    await connectDB();

    const response = await user.aggregate([
      {
        $match: {
          tokenActivate: token,
        },
      },
      {
        $project: {
          email: 1,
        },
      },
    ]);
    const users = response[0];

    // send activation email
    await sendActivationEmail(users.email, token);

    return NextResponse.json({
      statusbar: 200,
      message: "Send Email Verification.",
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}

export async function PUT(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const token = searchParams.get("token");
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
