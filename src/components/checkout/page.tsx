"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/src/components/ui/Container";

import { useCart } from "@/src/components/context/cartContext";
import Button from "@/src/components/ui/Button";
import { useOrder } from "@/src/components/context/orderContext";
import AddressView from "../address/page";

export default function CheckoutView() {
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [totalTax, setTotalTax] = useState<number>(0);
  const { cart } = useCart();

  const { addToOrder, isLoadingOrder } = useOrder();

  useEffect(() => {
    // Calculate subtotal, total, and total tax when cart changes
    let subTotal = 0;
    let total = 0;
    let totalTax = 0;

    if (cart) {
      cart.forEach((item: any) => {
        subTotal +=
          (item.product_Detail.price - item.product_Detail.discountprice) *
          item.qty;
        totalTax = item.product_Detail.deliveryCharge * cart.length;
      });

      total = subTotal + totalTax;
    }

    setSubtotal(subTotal);
    setTotal(total);
    setTotalTax(totalTax);
  }, [cart]);

  const [isFormFilled, setIsFormFilled] = useState(false);

  return (
    <Container>
      <div className="grid lg:grid-cols-9 grid-cols-1 gap-2 my-12">
        <div className="lg:col-span-6 col-span-1">
          <div className="relative overflow-x-auto sm:rounded-lg mb-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Product price
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart ? ( // Check if userData is not null before rendering
                  cart.map((user, index) => (
                    <tr
                      className="bg-white border-b hover:bg-gray-50"
                      key={index}
                    >
                      <td className="p-4">
                        <Image
                          src={user.product_Detail.image}
                          alt={user.product_Detail.name}
                          title={user.product_Detail.name}
                          height={1080}
                          width={1080}
                          className="w-full block h-20"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {user.product_Detail.name}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {user.qty}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {user.product_Detail.price -
                          user.product_Detail.discountprice}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {(user.product_Detail.price -
                          user.product_Detail.discountprice) *
                          user.qty}
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>NO user Cart...</p>
                )}
              </tbody>
            </table>
          </div>
          <AddressView setIsFormFilled={setIsFormFilled} />
        </div>
        <div className="lg:col-span-3 col-span-1 md:mt-0 mt-8">
          <div className="cart-total bg-slate-100 rounded-md p-4">
            <span className="flex items-center justify-center pb-3 text-xl font-bold">
              Cart Total
            </span>
            <div className="total flex items-center justify-between mt-8">
              <span>Sub Total</span>
              <span>{subtotal}</span>
            </div>
            <div className="tax my-4 flex items-center justify-between">
              <span>Tax Charges</span>
              <span>{totalTax}</span>
            </div>
            <div className="total border-t py-2 flex items-center justify-between">
              <span>Total</span>
              <span>{total}</span>
            </div>
            {isFormFilled && (
              <>
                <Button
                  className="button_bg w-full"
                  onClick={() =>
                    addToOrder(
                      cart.map((item) => ({
                        product: item.product_Detail._id,
                        qty: item.qty,
                      })),
                      total
                    )
                  }
                  disabled={isLoadingOrder}
                >
                  {isLoadingOrder ? "Processing..." : "Place Order"}
                </Button>
              </>
            )}
          </div>
        </div>{" "}
      </div>
    </Container>
  );
}
