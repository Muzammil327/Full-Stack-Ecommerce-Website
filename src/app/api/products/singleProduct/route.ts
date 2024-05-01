// import Product from "@/src/models/productModel";
// import connectDB from "@/src/utils/db";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {

//   const productId = params.id;

//   try {
//     await connectDB();
//     const product = await Product.findById(productId);
//     if (!product) {
//       return NextResponse.json({ error: "Product not found" });
//     }

//     return NextResponse.json({
//       success: true,
//       product,
//     });
//   } catch (error) {
//     return NextResponse.json({
//       success: false,
//       error: "Error fetching product",
//     });
//   }
// }
