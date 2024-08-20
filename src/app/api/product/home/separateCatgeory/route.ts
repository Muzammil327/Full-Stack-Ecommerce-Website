import connectDB from "@/src/utils/db";
import Product from "@/src/models/product/productModel";
import item from "@/src/models/product/itemsModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const tags = searchParams.get("tags");
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 9;

  await connectDB();
  try {

    const getitems = await item.aggregate([
      {
        $match: {
          name: tags,
        },
      },
    ])
    const getitemsmap = getitems.map((data) => data._id);

    const extractedId = getitemsmap[0];
    // Convert ObjectId to string
    const extractedIdStr = extractedId.toString();

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
      },
    };

    // skip stage
    const SkipStage = { $skip: (page - 1) * limit };

    // limit stage
    const LimitStage = { $limit: limit };

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
      ProjectStage,
      SkipStage,
      LimitStage,
    ]);

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
