import connectDB from "@/src/utils/db"; // Adjust path as per your project
import returnReplace from "@/src/models/form/returnReplaceModel"; // Adjust path as per your project
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { orderId, userName, contactNumber, returnReason, productCondition } =
    await req.json();
  await connectDB();
  try {
    if (!orderId) {
      return NextResponse.json({
        statusbar: 400,
        error: "Order Id is Required.",
      });
    }
    if (!userName) {
      return NextResponse.json({
        statusbar: 400,
        error: "Name is Required.",
      });
    }
    if (!contactNumber) {
      return NextResponse.json({
        statusbar: 400,
        error: "Phone Number is Required.",
      });
    }
    if (contactNumber > 10 && contactNumber < 11) {
      return NextResponse.json({
        statusbar: 400,
        error: "Error Phone Number.",
      });
    }
    if (!returnReason) {
      return NextResponse.json({
        statusbar: 400,
        error: "Return Reason is Required.",
      });
    }
    if (!productCondition) {
      return NextResponse.json({
        statusbar: 400,
        error: "Product Condition is Required.",
      });
    }

    const newWishList = new returnReplace({
      orderId,
      userName,
      contactNumber,
      returnReason,
      productCondition,
    });
    await newWishList.save();
    return NextResponse.json({
      statusbar: 200,
      message: "New Complaint added!",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json({
      statusbar: 400,
      error: "Error Registering",
    });
  }
}
