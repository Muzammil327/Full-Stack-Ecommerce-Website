import connectDB from "@/src/utils/db"; // Adjust path as per your project
import Cart from "@/src/models/cartModel"; // Adjust path as per your project
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  try {
    if (!userId) {
      return NextResponse.json({
        statusbar: 400,
        error: "User not found.",
      });
    }
    await connectDB();
    const get_user_cart = await Cart.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "products", // Name of the collection to join with
          localField: "productId", // Field in the Carts collection
          foreignField: "_id", // Field in the Products collection
          as: "product_Detail", // Alias for the joined data
        },
      },
      {
        $unwind: "$product_Detail",
      },
      {
        $project: {
          _id: 1,
          qty: 1,
          "product_Detail._id": 1,
          "product_Detail.image": 1,
          "product_Detail.price": 1,
          "product_Detail.name": 1,
          "product_Detail.discountprice": 1,
          "product_Detail.deliveryCharge": 1,
        },
      },
    ]);

    return NextResponse.json({
      statusbar: 200,
      message: "Cart successfully.",
      get_user_cart,
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}

export async function POST(req: NextRequest) {
  const { productId, userId } = await req.json();
  await connectDB();

  try {
    if (!productId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Product Id is Required.",
      });
    }
    if (!userId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Login is Required.",
      });
    }
    const cart = await Cart.findOne({ productId, userId });

    if (cart) {
      cart.qty += 1;
      await cart.save();
      return NextResponse.json({
        statusbar: 200,
        message: "Cart updated successfully.",
      });
    } else {
      const newProduct = new Cart({
        productId,
        userId,
      });
      await newProduct.save();
      return NextResponse.json({
        statusbar: 200,
        message: "New Items added in Cart!",
      });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Error Registering",
    });
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const cartId = searchParams.get("cartId");
  await connectDB();

  try {
    if (!cartId) {
      return NextResponse.json({
        statusbar: 400,
        error: "CARt Id is Required.",
      });
    }
    const deletedCart = await Cart.findByIdAndDelete({ _id: cartId });

    return NextResponse.json({
      statusbar: 200,
      message: "Item delete from Cart!",
      deletedCart,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Error Registering",
    });
  }
}

export async function PUT(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const increase = searchParams.get("increase");
  const decrease = searchParams.get("decrease");

  const { qty } = await req.json();

  await connectDB();

  try {
    if (increase) {
      try {
        const existingProduct = await Cart.findOne({
          _id: increase,
        });
        if (existingProduct) {
          // If the product already exists, increase its quantity
          existingProduct.qty = qty + 1;
          await existingProduct.save();
          return NextResponse.json({
            statusbar: 200,
            error: "Cart Item Increased Updated.",
          });
        } else {
          return NextResponse.json({
            statusbar: 400,
            error: "Cart not found.",
          });
        }
      } catch (error) {
        console.error("Error handling Cart item Increasing:", error);
        return NextResponse.json({
          statusbar: 400,
          error: "Error handling Cart item Increasing",
        });
      }
    }
    if (decrease) {
      try {
        const existingProduct = await Cart.findOne({
          _id: decrease,
        });
        if (existingProduct) {
          // Decrease the quantity if it's greater than 1
          if (existingProduct.qty > 1) {
            existingProduct.qty = qty - 1;
            await existingProduct.save();
            return NextResponse.json({
              statusbar: 200,
              error: "Cart Item Decrease Updated.",
            });
          } else {
            // If quantity is 1 or less, remove the item from the cart
            await Cart.deleteOne({ _id: decrease }); // Adjust this line
            return NextResponse.json({
              statusbar: 200,
              error: "Product removed from cart.",
            });
          }
        } else {
          return NextResponse.json({
            statusbar: 400,
            error: "Cart not found.",
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
    console.error("Error during updating increase and decrease:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Error Registering",
    });
  }
}