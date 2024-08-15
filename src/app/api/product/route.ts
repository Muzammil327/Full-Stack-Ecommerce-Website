import connectDB from "@/src/utils/db";
import product from "@/src/models/product/productModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const like = searchParams.get("like");
  const dislike = searchParams.get("dislike");
  const { userId, productId } = await req.json();

  await connectDB();

  try {
    if (like) {
      // find the product by id
      const products = await product.findById({ _id: productId });
      if (!products) {
        return NextResponse.json({
          statusbar: 400,
          error: "Product not found.",
        });
      }
      try {
        let updatedProduct;
        const userIndex = products.like.indexOf(userId);

        if (userIndex === -1 && userId) {
          updatedProduct = await product.findByIdAndUpdate(
            { _id: new mongoose.Types.ObjectId(productId) },
            {
              $push: { like: new mongoose.Types.ObjectId(userId) },
              $pull: { dislike: new mongoose.Types.ObjectId(userId) },
            },
            { new: true }
          );
          return NextResponse.json({
            statusbar: 200,
            message: "Product liked successfully",
          });
        } else {
          if (userId) {
            updatedProduct = await product.findByIdAndUpdate(
              { _id: new mongoose.Types.ObjectId(productId) },
              {
                $pull: { like: new mongoose.Types.ObjectId(userId) },
              },
              { new: true }
            );
          }
          return NextResponse.json({
            statusbar: 400,
            message: "Product return liked successfully",
          });
        }
      } catch (error) {
        console.error("Error like Product:", error);
        return NextResponse.json({
          statusbar: 400,
          error: "Error like Product.",
        });
      }
    }
    if (dislike) {
      // find the product by id
      const products = await product.findById({ _id: productId });
      if (!products) {
        return NextResponse.json({
          statusbar: 400,
          error: "Product not found.",
        });
      }
      try {
        let updatedProduct;
        const userIndex = products.dislike.indexOf(userId);

        if (userIndex === -1 && userId) {
          updatedProduct = await product.findByIdAndUpdate(
            { _id: new mongoose.Types.ObjectId(productId) },
            {
              $push: { dislike: new mongoose.Types.ObjectId(userId) },
              $pull: { like: new mongoose.Types.ObjectId(userId) },
            },
            { new: true }
          );
          return NextResponse.json({
            statusbar: 400,
            message: "Product unliked successfully",
          });
        } else {
          if (userId) {
            updatedProduct = await product.findByIdAndUpdate(
              { _id: new mongoose.Types.ObjectId(productId) },
              {
                $pull: { dislike: new mongoose.Types.ObjectId(userId) },
              },
              { new: true }
            );
          }
          return NextResponse.json({
            statusbar: 200,
            message: "Product return disliked successfully",
          });
        }
      } catch (error) {
        console.error("Error handling Cart item Decreasing:", error);
        return NextResponse.json({
          statusbar: 400,
          error: "Error handling Cart item Decreasing",
        });
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
  // Add other stages as needed
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
        slider: 1,
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
