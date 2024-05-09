import Products from "@/src/models/productModel";
import connectDB from "@/src/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const get_Hot_Products = await Products.aggregate([
      {
        $match: {
          Hot: true,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          category: 1,
          price: 1,
          discountprice: 1,
          image: 1,
          Featured: 1,
        },
      },
    ]);
    return NextResponse.json({
      success: true,
      message: "Fetch Hot Products",
      get_Hot_Products,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Error Fetch Hot Products",
    });
  }
}
