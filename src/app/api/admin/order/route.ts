import connectDB from "@/src/utils/db";
import order from "@/src/models/orderModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const status = searchParams.get("status");
  try {
    await connectDB();
    let getTotalOrder;
    getTotalOrder = await order.aggregate([
      {
        $lookup: {
          from: "product", // Name of the collection to join with
          localField: "productId", // Field in the Carts collection
          foreignField: "_id", // Field in the Products collection
          as: "product", // Alias for the joined data
        },
      },
      {
        $unwind: "$product",
      },
      {
        $lookup: {
          from: "user", // Name of the collection to join with
          localField: "userId", // Field in the Carts collection
          foreignField: "_id", // Field in the Products collection
          as: "user", // Alias for the joined data
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 1,
          quantity: 1,
          totalPrice: 1,
          status: 1,
          size: 1,
          createdAt: 1,
          "product.image": 1,
          "product.price": 1,
          "product.name": 1,
          "product.slug": 1,
          "product.discountprice": 1,
          "user.username": 1,
          "user.phone1": 1,
          "user.phone2": 1,
          "user.addressLine1": 1,
          "user.addressLine2": 1,
          "user.city": 1,
          "user.postalCode": 1,
          "user.country": 1,
          "user.additionalInfo": 1,
        },
      },
    ]);
    // const orders = await Orders.find({ status }); // Fetch orders with the specified status
    if (status) {
      getTotalOrder = await order.aggregate([
        {
          $match: {
            status: status,
          },
        },
        {
          $lookup: {
            from: "product", // Name of the collection to join with
            localField: "productId", // Field in the Carts collection
            foreignField: "_id", // Field in the Products collection
            as: "product", // Alias for the joined data
          },
        },
        {
          $unwind: "$product",
        },
        {
          $lookup: {
            from: "user", // Name of the collection to join with
            localField: "userId", // Field in the Carts collection
            foreignField: "_id", // Field in the Products collection
            as: "user", // Alias for the joined data
          },
        },
        {
          $unwind: "$user",
        },
        {
          $project: {
            _id: 1,
            quantity: 1,
            totalPrice: 1,
            status: 1,
            size: 1,
            createdAt: 1,
            "product.image": 1,
            "product.price": 1,
            "product.name": 1,
            "product.slug": 1,
            "product.discountprice": 1,
            "user.username": 1,
            "user.phone1": 1,
            "user.phone2": 1,
            "user.addressLine1": 1,
            "user.addressLine2": 1,
            "user.city": 1,
            "user.postalCode": 1,
            "user.country": 1,
            "user.additionalInfo": 1,
          },
        },
      ]);
    }

    return NextResponse.json({
      statusbar: 200,
      message: "Order successfully.",
      getTotalOrder,
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Internal Server Error",
    });
  }
}

export async function PUT(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const orderId = searchParams.get("orderId");

  const { status } = await req.json();

  await connectDB();

  try {
    const updatedOrder = await order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({
        statusbar: 400,
        error: "Order not found",
      });
    }

    return NextResponse.json({
      statusbar: 400,
      error: "Successfully Order status Updated.",
    });
  } catch (error) {
    console.error("Error during updating increase and decrease:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Error during updating increase and decrease",
    });
  }
}
