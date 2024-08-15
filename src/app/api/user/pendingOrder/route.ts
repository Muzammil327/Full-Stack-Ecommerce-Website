import connectDB from "@/src/utils/db"; // Adjust path as per your project
import pendingorder from "@/src/models/pendingOrderModel"; // Adjust path as per your project
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { productId, userId, qty } = await req.json();
  await connectDB();

  try {
    if (!productId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Product Id is Required.",
      });
    }
    if (!userId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Login is Required.",
      });
    }
    if (!qty) {
      return NextResponse.json({
        statusbar: 400,
        error: "Quantity is Required.",
      });
    }
    const existingPendingOrder = await pendingorder.findOne({
      productId,
      userId,
    });

    if (existingPendingOrder) {
      return NextResponse.json({
        statusbar: 200,
        error: "already pending order",
      });
    } else {
      // If it's a new product for the user, create a new pending order entry
      const newPendingOrder = new pendingorder({
        productId,
        userId,
        qty,
      });
      await newPendingOrder.save();
      return NextResponse.json({
        statusbar: 200,
        error: "post to pending order",
      });
    }
  } catch (error) {
    console.error("Error during post pending order:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Error Registering",
    });
  }
}
