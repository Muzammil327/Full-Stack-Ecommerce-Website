import { cookies } from 'next/headers'

import user from "@/src/models/userModel";
import connectDB from "@/src/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { sendActivationEmail } from "@/src/utils/email";
import crypto from "crypto";

function generateActivationToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function POST(req: NextRequest) {
  try {
    const { email, password, username } = await req.json();
    await connectDB();

    if (!username) {
      return NextResponse.json({
        statusbar: 400,
        error: "Username is Required.",
      });
    }
    if (!email || !password) {
      return NextResponse.json({
        statusbar: 400,
        error: "Email and Password is Required.",
      });
    }

    // Check if the username already exists in the database
    const existingUserName = await user.findOne({ username: username });
    if (existingUserName) {
      return NextResponse.json({
        statusbar: 400,
        error: "Username already exists",
      });
    }

    // Check if the email already exists in the database
    const existingEmail = await user.findOne({ email: email });
    if (existingEmail) {
      return NextResponse.json({
        statusbar: 400,
        error: "Email already exists",
      });
    }

    // Generate activation token
    const activationToken = generateActivationToken();

    // Create a new user with activation token
    const newUser = await new user({
      email,
      password,
      username,
      tokenActivate: activationToken,
    }).save();

    // send activation email
    await sendActivationEmail(email, activationToken);

    // store email in local storage

    cookies().set({
      name: 'activationToken',
      value: activationToken,
      // httpOnly: true,
      path: '/',
    })

    // back response
    return NextResponse.json({
      statusbar: 200,
      message: "User added successfully",
      newUser: {
        email: newUser.email,
        tokenActivate: newUser.tokenActivate,
        emailVerified: newUser.emailVerified,
      },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Error Registering",
    });
  }
}
