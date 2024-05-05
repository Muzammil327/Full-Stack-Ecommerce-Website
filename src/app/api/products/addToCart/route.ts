import Product from "@/src/models/productModel";
import connectDB from "@/src/utils/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/userModel";
import { getToken } from "next-auth/jwt";

export async function PUT(req: NextRequest) {
  try {
    const { productId, quantity } = await req.json();
    console.log(productId, quantity);
    const parsedQuantity = parseInt(quantity);

    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return NextResponse.json({ error: "Invalid quantity" });
    }

    const secret = process.env.JWT_SECRET;
    const token = await getToken({
      req: req,
      secret: secret,
      cookieName: "next-auth.session-token",
    });

    await connectDB();
    const user = await User.findById(token?._id);

    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }
    const datas = await User.updateMany(
      { _id: user._id },
      { $push: { cart: { productId, quantity } } } // Push an object with productId and quantity to the cart array
    );
    const data = await user.save();

    return NextResponse.json({
      success: true,
      message: "Product added successfully",
      data,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      error: "Error Product",
    });
  }
}

// export async function PUT(req: NextRequest) {
//   try {
//     const { productId, quantity } = await req.json();
//     const parsedQuantity = parseInt(quantity);

//     if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
//       return NextResponse.json({ error: "Invalid quantity" });
//     }

//     const secret = process.env.JWT_SECRET;
//     const token = await getToken({
//       req: req,
//       secret: secret,
//       cookieName: "next-auth.session-token",
//     });

//     await connectDB();
//     const user = await User.findById(token?._id);

//     if (!user) {
//       return NextResponse.json({ error: "User not found" });
//     }

//     const existingItem = user.cart.find((item: any) =>
//       item.productId.equals(productId)
//     );
//     // if (index !== -1) {
//     //   const existingItem = user.cart[index];
//     //   if (existingItem.quantity !== undefined) {
//     //     // If the item already exists in the cart and has a quantity property,
//     //     // update its quantity
//     //     existingItem.quantity += parsedQuantity;
//     //   } else {
//     //     // If the item exists but doesn't have a quantity property,
//     //     // set its quantity to the parsed quantity
//     //     existingItem.quantity = parsedQuantity;
//     //   }
//     // } else {
//     //   // If the item does not exist, add it to the cart with the specified quantity
//     //   user.cart.push({ productId, quantity: parsedQuantity });
//     // }

//     if (existingItem) {
//       existingItem.quantity += parsedQuantity; // Update quantity
//     } else {
//       user.cart.push({ productId, quantity: parsedQuantity }); // Push new item with parsed quantity
//     }
//     // Save the updated user object to the database
//     const data = await user.save();
//     console.log(data);

//     // Fetch the updated user object to get the latest cart data

//     // if (existingItem) {
//     //   existingItem.quantity += parsedQuantity; // Update quantity
//     // } else {
//     //   user.cart.push({ productId, quantity: parsedQuantity }); // Push new item with parsed quantity
//     // }
//     // console.log(user.cart);
//     // const data = await user.save();

//     return NextResponse.json({
//       success: true,
//       message: "Product added successfully",
//       data,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json({
//       success: false,
//       error: "Error Product",
//     });
//   }
// }

export async function DELETE(req: NextRequest) {
  const secret = process.env.JWT_SECRET;
  const token = await getToken({
    req: req,
    secret: secret,
    cookieName: "next-auth.session-token",
  });

  await connectDB();
  const user = await User.findById(token?._id);

  if (!user) {
    return NextResponse.json({ error: "User not found" });
  }
  try {
    const { productId } = await req.json();
    const index = user.cart.findIndex(
      (item: any) => item.productId === productId
    );
    if (index === -1) {
      // Remove the item from the cart array
      user.cart.splice(index, 1);

      // Save the updated user object to the database
      await user.save();

      // Fetch the updated user object to get the latest cart data
      const updatedUser = await User.findById(token?._id);

      return NextResponse.json({
        success: true,
        message: "Item removed from cart successfully",
        cart: updatedUser.cart, // Send the updated cart data in the response
      });
    } else {
      return NextResponse.json({
        success: true,
        message: "Item not removed from cart successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
