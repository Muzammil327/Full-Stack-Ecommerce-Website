"use client";
import { useAuth } from "@/src/components/context/authContext";
import { useCart } from "@/src/components/context/cartContext/page";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

interface CartItem {
  _id: string;
  quantity: number;
  product: {
    name: string;
    image: string;
    price: number;
  };
}

export default function Page() {
  const { pendingOrder } = useCart();
  const { session, status } = useAuth();

  if (status === "unauthenticated" && !session) {
    redirect("/sign-in");
    return null;
  }

  return (
    <div>
      {pendingOrder && pendingOrder.length > 0 ? (
        pendingOrder.map((order: any, index: number) => (
          <div key={index}>
            <p>Order ID: {order._id}</p>
            {order.cartBuy.map((item: CartItem, itemIndex: number) => (
              <tr
                className="bg-white border-b hover:bg-gray-50"
                key={`${index}-${itemIndex}`}
              >
                <td className="p-4">
                  <Image
                    src={`https://res.cloudinary.com/desggllml/image/upload/v1714240538/some-folder-name/${item.product.image}.png`}
                    alt={item.product.name}
                    title={item.product.name}
                    sizes="(max-width: 600px) 90vw, 600px"
                    height={1600}
                    width={1216}
                    className="w-16 md:w-32 max-w-full max-h-full"
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">
                  {item.product.name}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">
                  {item.product.price * item.quantity}
                </td>
                <td className="px-6 py-4">
                  {/* <button
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    onClick={() => DeleteHandle(order._id)}
                  >
                    Remove
                  </button> */}
                </td>
              </tr>
            ))}
          </div>
        ))
      ) : (
        <p>No pending orders.</p>
      )}
    </div>
  );
}
