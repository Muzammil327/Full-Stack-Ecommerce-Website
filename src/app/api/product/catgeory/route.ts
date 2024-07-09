import connectDB from "@/src/utils/db";
import Product from "@/src/models/productModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const cat = searchParams.get("cat");
  const subCatgeory = searchParams.get("subCatgeory");
  const tags = searchParams.get("tags");
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 9;
  await connectDB();
  try {
    // project stage
    const ProjectStage = {
      $project: {
        _id: 1,
        name: 1,
        slug: 1,
        image: 1,
        price: 1,
        category: 1,
      },
    };

    // skip stage
    const SkipStage = { $skip: (page - 1) * limit };

    // limit stage
    const LimitStage = { $limit: limit };

    let products = [];

    if (cat) {
      products = await Product.aggregate([
        {
          $match: {
            category: cat,
          },
        },
        ProjectStage,
        SkipStage,
        LimitStage,
      ]);
    }
    if (subCatgeory) {
      products = await Product.aggregate([
        {
          $match: {
            subCategory: subCatgeory,
          },
        },
        ProjectStage,
        SkipStage,
        LimitStage,
      ]);
    }
    if (tags) {
      products = await Product.aggregate([
        {
          $match: {
            items: tags,
          },
        },
        ProjectStage,
        SkipStage,
        LimitStage,
      ]);
    }

    const getproducts = await Product.find();

    const totalResults = getproducts.length;
    const totalPages = Math.ceil(totalResults / limit);

    return NextResponse.json({
      statusbar: 200,
      message: "Product successfully getting.",
      products,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalResults: totalResults,
        limit: limit,
      },
    });
  } catch (error) {
    console.error("Error verifying review:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}
