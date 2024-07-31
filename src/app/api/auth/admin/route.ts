import connectDB from "@/src/utils/db";
import cart from "@/src/models/cartModel";
import order from "@/src/models/orderModel";
import pendingorder from "@/src/models/pendingOrderModel";
import product from "@/src/models/product/productModel";
import user from "@/src/models/userModel";
import wishlist from "@/src/models/wishlistModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const get_admin_cart = await cart.aggregate([
      {
        $project: {
          _id: 1,
        },
      },
    ]);

    const get_admin_order = await order.aggregate([
      {
        $project: {
          _id: 1,
        },
      },
    ]);

    const get_admin_pendingorder = await pendingorder.aggregate([
      {
        $project: {
          _id: 1,
        },
      },
    ]);

    const get_admin_product = await product.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
        },
      },
    ]);

    const get_admin_user = await user.aggregate([
      {
        $project: {
          _id: 1,
        },
      },
    ]);

    const get_admin_wishlist = await wishlist.aggregate([
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
