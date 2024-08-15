import connectDB from "@/src/utils/db";
import product from "@/src/models/product/productModel";
import { NextRequest, NextResponse } from "next/server";

interface AggregationPipeline {
  $match?: any;
  $sort?: any;
  $project?: {
    [key: string]: number | string | boolean; // Adjust as per your projection needs
  };
  $skip?: number;
  $limit?: number;
  $lookup?: any;
  // Add other stages as needed
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

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
        dPrice: 1,
        "cat.name": 1,
        slider: 1,
      },
    };
    const LookupStage = {
      $lookup: {
        from: "catgeory", // Change this to the correct collection name if it's different
        localField: "categoryId",
        foreignField: "_id",
        as: "cat", // Name of the field to store the related products
      },
    };

    // skip stage
    const SkipStage = { $skip: (page - 1) * limit };

    // limit stage
    const LimitStage = { $limit: limit };

    let aggregationPipeline: AggregationPipeline[] = [];

    aggregationPipeline.push(LookupStage, ProjectStage, SkipStage, LimitStage);

    const products = await product.aggregate(aggregationPipeline as any);
    const getproducts = await product.find();

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
