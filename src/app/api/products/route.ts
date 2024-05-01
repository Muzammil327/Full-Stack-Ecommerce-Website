import Product from "@/src/models/productModel";
import connectDB from "@/src/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, basePrice } = await req.json();
    const formData = await req.formData();

    // Get the file from the form data
    const file = formData.get("files");
    console.log(file);

    await connectDB();

    if (!name) {
      return NextResponse.json({
        success: false,
        error: "Name is Required.",
      });
    }
    if (!basePrice) {
      return NextResponse.json({
        success: false,
        error: "Base Price is Required.",
      });
    }

    // Check if the username already exists in the database
    const existingProduct = await Product.findOne({
      name: name,
      basePrice: basePrice,
    });
    if (existingProduct) {
      return NextResponse.json({
        success: false,
        error: "Product already exists",
      });
    }

    // If the email doesn't exist, create a new user document
    const newUser = new Product({ name, basePrice });
    await newUser.save();
    return NextResponse.json({
      success: true,
      message: "Product added successfully",
      user: newUser,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Error Product",
    });
  }
}

export async function GET(req: NextRequest) {
  // const url = new URL(req.url);
  // console.log("url:", url);
  // const searchParsms = new URLSearchParams(url.searchParams);
  // console.log("searchParsms:", searchParsms);

  // const name = searchParsms.get("name");
  // console.log("name:", name);

  // const basePrice = searchParsms.get("basePrice");
  // console.log("basePrice:", basePrice);

  try {
    const catgeoryProduct = await Product.find();
    // const catgeoryProduct = await Product.find({
    //   name: { $eq: name },
    //   basePrice: { $eq: basePrice },
    // });
    return NextResponse.json({
      success: false,
      error: "Product already exists",
      catgeoryProduct,
    });
  } catch (error) {
    console.log(error);
  }
}
