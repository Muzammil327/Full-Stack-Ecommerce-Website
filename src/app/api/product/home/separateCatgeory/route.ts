import connectDB from "@/src/utils/db";
import Product from "@/src/models/product/productModel";
import item from "@/src/models/product/itemsModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const tags = searchParams.get("tags");
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 8;

  await connectDB();
  try {
    const getitems = await item.aggregate([
      {
        $match: {
          name: tags,
        },
      },
    ]);

    if (getitems.length === 0) {
      return NextResponse.json({
        statusbar: 404,
        message: "Item not found.",
      });
    }
    const getitemsmap = getitems.map((data) => data._id);

    const extractedId = getitemsmap[0];
    // Convert ObjectId to string
    const extractedIdStr = extractedId.toString();

    // Count total results for pagination
    const totalResultsData = await Product.aggregate([
      {
        $match: {
          itemId: new mongoose.Types.ObjectId(extractedId),
        },
      },
      {
        $count: "totalResults",
      },
    ]);

    // Make the pagination
    const totalResults = totalResultsData[0]?.totalResults || 0;
    const totalPages = Math.ceil(totalResults / limit);

    // Fetch the pagination products
    const products = await Product.aggregate([
      {
        $match: {
          itemId: new mongoose.Types.ObjectId(extractedIdStr),
        },
      },
      {
        $lookup: {
          from: "catgeory", // Change this to the correct collection name if it's different
          localField: "categoryId",
          foreignField: "_id",
          as: "cat", // Name of the field to store the related products
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          image: 1,
          price: 1,
          dPrice: 1,
          "cat.name": 1,
        },
      },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]);

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
