"use client";
import React, { CSSProperties, useEffect, useState } from "react";
import Container from "@/src/components/element/container/page";
import { useCart } from "@/src/components/context/cartContext/page";
import Image from "next/image";
import { useAuth } from "@/src/components/context/authContext";
import { redirect } from "next/navigation";

const Checkout = () => {
  const { cartBuy, removeFromCart, updateCartIncrease, updateCartDecrease } =
    useCart();
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [totalTax, setTotalTax] = useState<number>(0);
  const { session, status } = useAuth();

  if (status === "unauthenticated" && !session) {
    redirect("/sign-in");
  }

  const DeleteHandle = async (productId: string) => {
    removeFromCart(productId);
  };

  useEffect(() => {
    // Calculate subtotal, total, and total tax when cartBuy changes
    let subTotal = 0;
    let total = 0;
    let totalTax = 0;

    if (cartBuy) {
      cartBuy.forEach((item: any) => {
        subTotal += item.product.price * item.quantity;
      });

      const taxCharges = 200; // Assuming tax charges
      totalTax = taxCharges * cartBuy.length;
      total = subTotal + totalTax;
    }

    setSubtotal(subTotal);
    setTotal(total);
    setTotalTax(totalTax);
  }, [cartBuy]);
  return (
    <>
      <Container>
        <div className="grid md:grid-cols-6 gap-2 my-20">
          <div className="md:col-span-4">
            
          </div>
          <div className="col-span-2 md:mt-0 mt-8">
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
              <button className="py-3 mt-6 px-16 bg-red-500 border border-solid border-red-500 hover:bg-white hover:text-red-500 text-white rounded-md block w-full text-lg font-semibold transition-all hover:transition-all">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;

const svgStyle: CSSProperties = {
  stroke: "rgb(0, 0, 0)",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 2,
};
