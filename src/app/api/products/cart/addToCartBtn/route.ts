import connectDB from "@/src/utils/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/userModel";
import CartModel from "@/src/models/cartModel";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  try {
    const { _id, quantity, name, price, image } = await req.json();
    
    const parsedQuantity = parseInt(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return NextResponse.json({ error: "Invalid quantity" });
    }

    const token = await getToken({
      req: req,
      secret: process.env.JWT_SECRET,
      cookieName: "next-auth.session-token",
    });

    await connectDB();
    const user = await User.findById(token?._id);

    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    const existingProduct = await CartModel.findOne({ products: _id });
    if (existingProduct) {
      // If the product already exists, increase its quantity
      existingProduct.quantity += parsedQuantity;
      await existingProduct.save();

      return NextResponse.json({
        success: true,
        message: "Product quantity increased successfully",
        cart: existingProduct,
      });
    } else {
      const newCart = new CartModel({
        name,
        quantity: parsedQuantity,
        price,
        products: _id,
        user: user._id,
        image,
      });
      const savedCart = await newCart.save();

      return NextResponse.json({
        success: true,
        message: "Product added successfully",
        cart: savedCart,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      error: "Error Product",
    });
  }
}
