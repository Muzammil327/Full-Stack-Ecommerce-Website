import connectDB from "@/src/utils/db"; // Adjust path as per your project
import product from "@/src/models/product/productModel"; // Adjust path as per your project
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  const productId = params.productId;
  try {
    if (!productId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Product not found.",
      });
    }
    await connectDB();
    const getProduct = await product.aggregate([
      {
        $match: {
          slug: productId,
        },
      },
      {
        $lookup: {
          from: "item", // Change this to the correct collection name if it's different
          localField: "itemId",
          foreignField: "_id",
          as: "item", // Name of the field to store the related products
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
        $lookup: {
          from: "subcatgeory",
          localField: "subCategoryId",
          foreignField: "_id",
          as: "scat",
        },
      },
      {
        $lookup: {
          from: "product",
          localField: "productId",
          foreignField: "_id",
          as: "product_details",
        },
      },
      {
        $lookup: {
          from: "color",
          localField: "colorId",
          foreignField: "_id",
          as: "color_details",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          Sdescription: 1,
          Ldescription: 1,
          slug: 1,
          image: 1,
          price: 1,
          dPrice: 1,
          slider: 1,
          like: 1,
          dislike: 1,
          "scat.name": 1,
          "item.name": 1,
          cat: {
            $map: {
              input: "$cat.name",
              as: "name",
              in: {
                name: "$$name",
              },
            },
          },
          product_details: {
            _id: 1,
            name: 1,
            image: 1,
            slug: 1,
            price: 1,
            dPrice: 1,
            cat: {
              $map: {
                input: "$cat.name",
                as: "name",
                in: {
                  name: "$$name",
                },
              },
            },
          },
          color_details: {
            _id: 1,
            name: 1,
          },
        },
      },
    ]);
    const singleProduct = getProduct[0];
    if (singleProduct) {
      return NextResponse.json({
        statusbar: 200,
        message: "Product Detail successfully getting.",
        singleProduct,
      });
    } else {
      return NextResponse.json({
        statusbar: 400,
        message: "Product not found.",
        singleProduct,
      });
    }
  } catch (error) {
    console.error("Error getting order item by user:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}
