"use client";
import React from "react";
import Container from "@/src/components/ui/Container";
import { useCart } from "@/src/components/context/cartContext";
import FetchCart from "@/src/components/cart/FetchCart";
import LoadingCart from "@/src/components/ui/Loading/LoadingCart";
import CheckoutButton from "@/src/components/cart/CheckoutButton";

const CartView = ({ userId }: { userId: string }) => {
  const { isFetching, cart, getToCartBtn } = useCart(); // Assume useCart provides cartItems as well

  return (
    <Container>
      <div className="grid lg:grid-cols-6 grid-cols-1 gap-x-8 md:my-20 my-10">
        <div className="lg:col-span-4 col-span-1 relative overflow-x-auto sm:rounded-lg mb-10">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-12 py-2">
                    Image
                  </th>
                  <th scope="col" className="px-20 py-2 text-left">
                    Name
                  </th>
                  <th scope="col" className="px-20 py-2">
                    Qty
                  </th>
                  <th scope="col" className="px-20 py-2">
                    Price
                  </th>
                  <th scope="col" className="px-20 py-2">
                    <span>Size</span>
                  </th>
                  <th scope="col" className="px-20 py-2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {isFetching ? (
                  Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <tr key={index}>
                        <td colSpan={5}>
                          <LoadingCart />
                        </td>
                      </tr>
                    ))
                ) : (
                  <FetchCart cart={cart} getToCartBtn={getToCartBtn} />
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-2 col-span-1 md:mt-0 mt-8 bg-slate-200 rounded-md p-6">
          <CheckoutButton userId={userId} cart={cart} />
        </div>
      </div>
    </Container>
  );
};

export default CartView;
