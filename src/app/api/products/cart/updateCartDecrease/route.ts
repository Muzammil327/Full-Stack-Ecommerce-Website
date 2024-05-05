// updateCart

import connectDB from "@/src/utils/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/userModel";
import CartModel from "@/src/models/cartModel";
import { getToken } from "next-auth/jwt";

export async function PUT(req: NextRequest) {
  try {
    const { productId, quantity } = await req.json();
    const parsedQuantity = parseInt(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return NextResponse.json({ error: "Invalid quantity" });
    }

    const secret = process.env.JWT_SECRET;
    const token = await getToken({
      req: req,
      secret: secret,
      cookieName: "next-auth.session-token",
    });

    await connectDB();
    const user = await User.findById(token?._id);

    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    const productIdString = productId.toString(); // Convert productId to string
    const existingProduct = await CartModel.findOne({
      _id: productIdString,
    });

    if (existingProduct) {
      // If the product already exists, increase its quantity
      existingProduct.quantity = parsedQuantity - 1;
      await existingProduct.save();
      return NextResponse.json({
        success: true,
        message: "Product quantity increased successfully",
        cart: existingProduct,
      });
    } else {
      const newCart = new CartModel({
        quantity: parsedQuantity,
      });
      const savedCart = await newCart.save();
      console.log(savedCart);

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
