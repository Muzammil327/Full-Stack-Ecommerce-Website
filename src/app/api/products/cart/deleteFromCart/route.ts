import CartModel from "@/src/models/cartModel";
import connectDB from "@/src/utils/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/userModel";
import { getToken } from "next-auth/jwt";

export async function DELETE(req: NextRequest) {
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
  try {
    const { productId } = await req.json();
    const deletecart = await CartModel.findByIdAndDelete({ _id: productId });
    return NextResponse.json({
      success: true,
      message: "Product quantity increased successfully",
      deletecart,
    });
  } catch (error) {
    console.log(error);
  }
}
