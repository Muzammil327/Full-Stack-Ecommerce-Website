import askquestion from "@/src/models/form/askQuestionModel";
import connectDB from "@/src/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();
    await connectDB();

    if (!name || !email || !phone || !message) {
      return NextResponse.json({
        statusbar: 400,
        error: "Fields are Required.",
      });
    }

    // Create a new user with activation token
    await new askquestion({
      name,
      email,
      phone,
      message,
    }).save();

    // back response
    return NextResponse.json({
      statusbar: 200,
      message: "Question added successfully",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Error Registering",
    });
  }
}
