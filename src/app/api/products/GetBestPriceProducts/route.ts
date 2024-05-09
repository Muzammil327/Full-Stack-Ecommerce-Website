import Products from "@/src/models/productModel";
import connectDB from "@/src/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const get_Best_Price_Products = await Products.aggregate([
      {
        $match: {
          BestPrice: true,
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
        },
      },
    ]);
    return NextResponse.json({
      success: true,
      message: "Fetch Best Price Products",
      get_Best_Price_Products,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Error Fetch Best Price Products",
    });
  }
}
