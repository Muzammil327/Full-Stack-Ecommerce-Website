import connectDB from "@/src/utils/db";
import product from "@/src/models/product/productModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const get_related_product = await product.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
        },
      },
    ]);

    return NextResponse.json({
      statusbar: 200,
      message: "Cart successfully.",
      get_related_product,
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}
