import User from "@/src/models/userModel";
import connectDB from "@/src/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password, username } = await req.json();
    await connectDB();

    if (!username) {
      return NextResponse.json({
        success: false,
        error: "Username is Required.",
      });
    }
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        error: "Email and Password is Required.",
      });
    }

    // Check if the username already exists in the database
    const existingUserName = await User.findOne({ username: username });
    if (existingUserName) {
      return NextResponse.json({
        success: false,
        error: "Username already exists",
      });
    }

    // Check if the email already exists in the database
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return NextResponse.json({
        success: false,
        error: "Email already exists",
      });
    }
    // If the email doesn't exist, create a new user document
    const newUser = new User({ email, password, username });
    await newUser.save();

    return NextResponse.json({
      success: true,
      message: "User added successfully",
      user: newUser,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Error Registering",
    });
  }
}
