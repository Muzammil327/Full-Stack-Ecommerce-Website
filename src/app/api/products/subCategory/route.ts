import productSubCatgeory from "@/src/models/products/subCatgeoryModel";
import connectDB from "@/src/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, categoryId } = await req.json();
    console.log(title)
    console.log(categoryId)
    await connectDB();

    if (!categoryId) {
      return NextResponse.json({
        success: false,
        error: "Category Id is Required.",
      });
    }

    if (!title) {
      return NextResponse.json({
        success: false,
        error: "Title is Required.",
      });
    }

    // Check if the username already exists in the database
    const existingProductSubCatgeory = await productSubCatgeory.findOne({
      title: title,
      categoryId: categoryId,
    });
    if (existingProductSubCatgeory) {
      return NextResponse.json({
        success: false,
        error: "Product Sub Catgeory already exists",
      });
    }

    // If the email doesn't exist, create a new user document
    const newUser = new productSubCatgeory({ title, categoryId });
    await newUser.save();

    return NextResponse.json({
      success: true,
      message: "Product Sub Catgeory added successfully",
      user: newUser,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Error Product Sub Catgeory",
    });
  }
}
