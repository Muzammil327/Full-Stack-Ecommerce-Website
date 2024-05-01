import OrderModel from "@/src/models/orderModel";
import connectDB from "@/src/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function PUT(request: NextRequest) {
  const { subtotal, totalTax, total, cart } = await request.json();
  console.log(subtotal, totalTax, total, cart);
  connectDB();
  const secret = process.env.JWT_SECRET;
  const token = await getToken({
    req: request,
    secret: secret,
    cookieName: "next-auth.session-token",
  });
  try {
    const pendingOrder = await OrderModel.findByIdAndUpdate(token?._id, {
      subtotal,
      totalTax,
      total,
      cart,
    });
    return NextResponse.json({ pendingOrder });
  } catch (error) {
    return NextResponse.json({
      message: (error as { message: string }).message,
    });
  }
}
