import connectDB from "@/src/utils/db"; // Adjust path as per your project
import Product from "@/src/models/productModel"; // Adjust path as per your project
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
    const getProduct = await Product.aggregate([
      {
        $match: {
          slug: productId,
        },
      },
      {
        $lookup: {
          from: "products", // Change this to the correct collection name if it's different
          localField: "product.value",
          foreignField: "_id",
          as: "product_details", // Name of the field to store the related products
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          slug: 1,
          image: 1,
          category: 1,
          subCategory: 1,
          items: 1,
          price: 1,
          slider: 1,
          like: 1,
          dislike: 1,
          "product_details._id": 1, // Include the related product_detailss in the result
          "product_details.name": 1, // Include the related product_detailss in the result
          "product_details.image": 1, // Include the related product_detailss in the result
          "product_details.slug": 1, // Include the related product_detailss in the result
          "product_details.price": 1, // Include the related product_detailss in the result
          "product_details.category": 1, // Include the related products in the result
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
