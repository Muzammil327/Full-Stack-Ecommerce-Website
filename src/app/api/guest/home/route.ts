import connectDB from "@/src/utils/db";
import product from "@/src/models/product/productModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const feature = searchParams.get("feature");
  const top = searchParams.get("top");
  const bestPrice = searchParams.get("bestPrice");

  await connectDB();

  try {
    if (feature) {
      try {
        const get_Products = await product.aggregate([
          {
            $match: {
              feature: true,
            },
          },
          {
            $lookup: {
              from: "catgeory",
              localField: "categoryId",
              foreignField: "_id",
              as: "cat",
            },
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
          get_Products,
        });
      } catch (error) {
        console.log(error);
      }
    }
    if (top) {
      try {
        const get_Products = await product.aggregate([
          {
            $match: {
              top: true,
            },
          },
          {
            $lookup: {
              from: "catgeory",
              localField: "categoryId",
              foreignField: "_id",
              as: "cat",
            },
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
          get_Products,
        });
      } catch (error) {
        console.log(error);
      }
    }
    if (bestPrice) {
      try {
        const get_Products = await product.aggregate([
          {
            $match: {
              bestPrice: true,
            },
          },
          {
            $lookup: {
              from: "catgeory",
              localField: "categoryId",
              foreignField: "_id",
              as: "cat",
            },
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
          get_Products,
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
