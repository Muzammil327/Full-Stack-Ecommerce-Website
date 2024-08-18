import connectDB from "@/src/utils/db"; // Adjust path as per your project
import order from "@/src/models/orderModel"; // Adjust path as per your project
import { NextRequest, NextResponse } from "next/server";
import Cart from "@/src/models/cartModel";
import PendingOrder from "@/src/models/pendingOrderModel";

export async function POST(req: NextRequest) {
  const { productId, userId, totalPrice, qty, color } = await req.json();
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
    if (!totalPrice) {
      return NextResponse.json({
        statusbar: 400,
        error: "Total Price is Required.",
      });
    }
    if (!qty) {
      return NextResponse.json({
        statusbar: 400,
        error: "Quantity is Required.",
      });
    }

    const newOrder = new order({
      productId,
      userId,
      totalPrice,
      qty,
      color,
    });

    await newOrder.save();
    await Cart.deleteMany({ productId, userId }); // Assuming you can identify cart items by productId and userId
    await PendingOrder.deleteMany({ productId, userId });
    return NextResponse.json({
      statusbar: 200,
      message: "Product Successfully Submit.",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Error Registering",
    });
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const orderId = searchParams.get("orderId");
  await connectDB();

  try {
    if (!orderId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Order Id is Required.",
      });
    }
    const deletedOrder = await order.findByIdAndDelete({ _id: orderId });

    return NextResponse.json({
      statusbar: 200,
      message: "Item delete from Order!",
      deletedOrder,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Error Registering",
    });
  }
}
