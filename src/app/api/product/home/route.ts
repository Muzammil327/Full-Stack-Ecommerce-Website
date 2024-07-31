import connectDB from "@/src/utils/db";
import product from "@/src/models/product/productModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const feature = searchParams.get("feature");

  await connectDB();

  try {
    if (feature) {
      try {
        const get_Feature_Products = await product.aggregate([
          {
            $match: {
              feature: true,
            },
          },
          {
            $lookup:{
              from:"catgeory",
              localField:"categoryId",
              foreignField:"_id",
              as:"cat"
            }
          },
          { $limit: 8 },
          {
            $project: {
              _id: 1,
              name: 1,
              slug: 1,
              price: 1,
              dPrice: 1,
              image: 1,
              "cat.name": 1,
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
