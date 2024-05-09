import Products from "@/src/models/productModel";
import connectDB from "@/src/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const get_Feature_Products = await Products.aggregate([
      {
        $match: {
          Featured: true,
        },
      },
      { $limit: 8 },
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
      message: "Fetch Features Products",
      get_Feature_Products,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Error Fetch Features Products",
    });
  }
}
