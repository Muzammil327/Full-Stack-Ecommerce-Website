import productCatgeory from "@/src/models/products/catgeoryModel";
import connectDB from "@/src/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json();
    await connectDB();

    if (!title) {
      return NextResponse.json({
        success: false,
        error: "Title is Required.",
      });
    }

    // Check if the username already exists in the database
    const existingProductCatgeory = await productCatgeory.findOne({
      title: title,
    });
    if (existingProductCatgeory) {
      return NextResponse.json({
        success: false,
        error: "Product Catgeory already exists",
      });
    }

    // If the email doesn't exist, create a new user document
    const newUser = new productCatgeory({ title });
    await newUser.save();

    return NextResponse.json({
      success: true,
      message: "Product Catgeory added successfully",
      user: newUser,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Error Product Catgeory",
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const catgeoryProduct = await productCatgeory.find();
    return NextResponse.json({
      success: false,
      error: "Product Catgeory already exists",
      catgeoryProduct,
    });
  } catch (error) {
    console.log(error);
  }
}
