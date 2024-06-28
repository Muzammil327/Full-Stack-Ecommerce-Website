import connectDB from "@/src/utils/db";
import Product from "@/src/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const feature = searchParams.get("feature");

  await connectDB();

  try {
    if (feature) {
      try {
        const get_Feature_Products = await Product.aggregate([
          {
            $match: {
              feature: true,
            },
          },
          { $limit: 8 },
          {
            $project: {
              _id: 1,
              name: 1,
              slug: 1,
              category: 1,
              price: 1,
              discountprice: 1,
              image: 1,
              feature: 1,
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
    // if (dislike) {
    //   // find the product by id
    //   const product = await Product.findById({ _id: productId });
    //   if (!product) {
    //     return NextResponse.json({
    //       statusbar: 400,
    //       error: "Product not found.",
    //     });
    //   }
    //   try {
    //     let updatedProduct;
    //     const userIndex = product.dislike.indexOf(userId);

    //     if (userIndex === -1 && userId) {
    //       updatedProduct = await Product.findByIdAndUpdate(
    //         { _id: new mongoose.Types.ObjectId(productId) },
    //         {
    //           $push: { dislike: new mongoose.Types.ObjectId(userId) },
    //           $pull: { like: new mongoose.Types.ObjectId(userId) },
    //         },
    //         { new: true }
    //       );
    //       return NextResponse.json({
    //         statusbar: 400,
    //         message: "Product unliked successfully",
    //       });
    //     } else {
    //       if (userId) {
    //         updatedProduct = await Product.findByIdAndUpdate(
    //           { _id: new mongoose.Types.ObjectId(productId) },
    //           {
    //             $pull: { dislike: new mongoose.Types.ObjectId(userId) },
    //           },
    //           { new: true }
    //         );
    //       }
    //       return NextResponse.json({
    //         statusbar: 200,
    //         message: "Product return disliked successfully",
    //       });
    //     }
    //   } catch (error) {
    //     console.error("Error handling Cart item Decreasing:", error);
    //     return NextResponse.json({
    //       statusbar: 400,
    //       error: "Error handling Cart item Decreasing",
    //     });
    //   }
    // }
  } catch (error) {
    console.error("Error disLike Product:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Error disLike Product",
    });
  }
}
