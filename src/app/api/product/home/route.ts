import connectDB from "@/src/utils/db";
import Product from "@/src/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const feature = searchParams.get("feature");

  await connectDB();

  try {
    if (feature) {
      try {
        const get_Feature_Products = await Product.aggregate([
          {
            $match: {
              feature: true,
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
              feature: 1,
            },
          },
        ]);

        return NextResponse.json({
          success: true,
          message: "Fetch Features Products",
          get_Feature_Products,
        });
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.error("Error disLike Product:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Error disLike Product",
    });
  }
}
