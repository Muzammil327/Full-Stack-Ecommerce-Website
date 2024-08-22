import connectDB from "@/src/utils/db";
import product from "@/src/models/product/productModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

interface Product {
  _id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  category: string;
  subcategory?: string;
}

interface AggregationPipeline {
  $match?: any;
  $sort?: any;
  $project?: {
    [key: string]: number | string | boolean; // Adjust as per your projection needs
  };
  $skip?: number;
  $limit?: number;
  $lookup?: any;
  $count?: string;
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const lowToHigh = searchParams.get("lowToHigh");
  const highToLow = searchParams.get("highToLow");
  const lowPrice = Number(searchParams.get("lowPrice"));
  const highPrice = Number(searchParams.get("highPrice"));
  const category = searchParams.get("category");
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
        dPrice: 1,
        "cat.name": 1,
        subCategory: 1,
        items: 1,
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

    if (category) {
      // Convert category to ObjectId
      const categoryId = Array.isArray(category)
        ? category.map((id) => new mongoose.Types.ObjectId(id || ""))
        : [new mongoose.Types.ObjectId(category || "")];
      aggregationPipeline.push({
        $match: {
          categoryId: {
            $in: categoryId,
          },
        },
      });
    }

    if (subCatgeory) {
      // Convert category to ObjectId
      const subCategoryId = Array.isArray(subCatgeory)
        ? subCatgeory.map((id) => new mongoose.Types.ObjectId(id || ""))
        : [new mongoose.Types.ObjectId(subCatgeory || "")];
      aggregationPipeline.push({
        $match: {
          subCategoryId: {
            $in: subCategoryId,
          },
        },
      });
    }
    if (tags) {
      // Convert category to ObjectId
      const itemId = Array.isArray(tags)
        ? tags.map((id) => new mongoose.Types.ObjectId(id || ""))
        : [new mongoose.Types.ObjectId(tags || "")];
      aggregationPipeline.push({
        $match: {
          itemId: {
            $in: itemId,
          },
        },
      });
    }

    if (lowPrice && highPrice) {
      aggregationPipeline.push({
        $match: { price: { $gte: lowPrice, $lte: highPrice } },
      });
    }

    if (lowToHigh) {
      aggregationPipeline.push({
        $sort: { price: 1 },
      });
    }

    if (highToLow) {
      aggregationPipeline.push({
        $sort: { price: -1 },
      });
    }

    aggregationPipeline.push(LookupStage, ProjectStage, SkipStage, LimitStage);

    const products = await product.aggregate(aggregationPipeline as any);
    const totalResultsPipeline: AggregationPipeline[] = [
      { $count: "totalResults" },
    ];
    const totalResultsData = await product.aggregate(
      totalResultsPipeline as any
    );
    const totalResults = totalResultsData[0]?.totalResults || 0;
    const totalPages = Math.ceil(totalResults / limit);

    return NextResponse.json({
      statusbar: 200,
      message: "Product successfully getting.",
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalResults,
        limit,
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
