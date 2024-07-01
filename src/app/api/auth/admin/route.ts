import connectDB from "@/src/utils/db";
import Cart from "@/src/models/cartModel";
import Order from "@/src/models/orderModel";
import PendingOrder from "@/src/models/pendingOrderModel";
import Product from "@/src/models/productModel";
import User from "@/src/models/userModel";
import Wishlist from "@/src/models/wishlistModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const get_admin_cart = await Cart.aggregate([
      {
        $project: {
          _id: 1,
        },
      },
    ]);

    const get_admin_order = await Order.aggregate([
      {
        $project: {
          _id: 1,
        },
      },
    ]);

    const get_admin_pendingorder = await PendingOrder.aggregate([
      {
        $project: {
          _id: 1,
        },
      },
    ]);

    const get_admin_product = await Product.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
        },
      },
    ]);

    const get_admin_user = await User.aggregate([
      {
        $project: {
          _id: 1,
        },
      },
    ]);

    const get_admin_wishlist = await Wishlist.aggregate([
      {
        $project: {
          _id: 1,
        },
      },
    ]);

    return NextResponse.json({
      statusbar: 200,
      message: "Admin successfully.",
      get_admin_cart,
      get_admin_order,
      get_admin_pendingorder,
      get_admin_product,
      get_admin_user,
      get_admin_wishlist,
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}
