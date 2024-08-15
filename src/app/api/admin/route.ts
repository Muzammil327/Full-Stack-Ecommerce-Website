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

    const get_admin_cart_count = await cart.aggregate([{ $count: "count" }]);
    const get_admin_order_count = await order.aggregate([{ $count: "count" }]);
    const get_admin_pendingorder_count = await pendingorder.aggregate([
      { $count: "count" },
    ]);
    const get_admin_product_count = await product.aggregate([
      { $count: "count" },
    ]);
    const get_admin_user_count = await user.aggregate([{ $count: "count" }]);
    const get_admin_wishlist_count = await wishlist.aggregate([
      { $count: "count" },
    ]);

    return NextResponse.json({
      status: 200,
      message: "Admin data retrieved successfully.",
      counts: {
        cart: get_admin_cart_count[0]?.count || 0,
        order: get_admin_order_count[0]?.count || 0,
        pendingOrder: get_admin_pendingorder_count[0]?.count || 0,
        product: get_admin_product_count[0]?.count || 0,
        user: get_admin_user_count[0]?.count || 0,
        wishlist: get_admin_wishlist_count[0]?.count || 0,
      },
    });
  } catch (error) {
    console.error("Error retrieving admin data:", error);
    return NextResponse.json({
      status: 500,
      error: "Internal Server Error",
    });
  }
}
