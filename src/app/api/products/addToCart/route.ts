import Product from "@/src/models/productModel";
import connectDB from "@/src/utils/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/userModel";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  const { productId, quantity } = await req.json();
  const secret = process.env.JWT_SECRET;

  const token = await getToken({
    req: req,
    secret: secret,
    cookieName: "next-auth.session-token",
  });

  try {
    await connectDB();
    const user = await User.findById(token?._id);
    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }
    // Check if the product already exists in the cart
    const existingItem = user.cart.find((item: any) =>
      item.productId.equals(productId)
    );
    if (existingItem) {
      // If the product exists, update its quantity
      existingItem.quantity += quantity;
    } else {
      // If the product does not exist, push a new item to the cart
      user.cart.push({ productId, quantity });
    }
    const data = await user.save();
    return NextResponse.json({
      success: true,
      message: "Product added successfully",
      data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Error Product",
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const catgeoryProduct = await Product.find();
    return NextResponse.json({
      success: false,
      error: "Product already exists",
      catgeoryProduct,
    });
  } catch (error) {
    console.log(error);
  }
}
