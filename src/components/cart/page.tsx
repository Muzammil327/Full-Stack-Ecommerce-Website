"use client";
import React from "react";
import Container from "@/src/components/ui/Container";
import { useCart } from "@/src/components/context/cartContext";
import FetchCart from "@/src/components/cart/FetchCart";
import LoadingCart from "@/src/components/ui/Loading/LoadingCart";
import CheckoutButton from "@/src/components/cart/CheckoutButton";
import { Table } from "@/src/components/ui/ui";

const CartView = ({ userId }: { userId: string }) => {
  const { isFetching, cart, getToCartBtn } = useCart(); // Assume useCart provides cartItems as well
  // t1: "Image",
  // t2: "Name",
  // t3: "Qty",
  // t4: "Price",
  // t5: "Size",
  // t6: "Action",
  return (
    <Container>
      <div className="grid lg:grid-cols-6 grid-cols-1 gap-x-8 md:my-20 my-10">
        <div className="lg:col-span-4 col-span-1 relative overflow-x-auto sm:rounded-lg mb-10">
          <Table columns={[
            "Image",
            "Name",
            "Qty",
            "Price",
            "Size",
            "Action",
          ]} loading={isFetching} cellCount={6}>
            {isFetching ? (
              Array(4)
                .fill(0)
                .map((_, index) => (
                  <tr key={index}>
                    <td colSpan={6}>
                      <LoadingCart />
                    </td>
                  </tr>
                ))
            ) : (
              <FetchCart cart={cart} getToCartBtn={getToCartBtn} />
            )}
          </Table>
        </div>

        <div className="lg:col-span-2 col-span-1 md:mt-0 mt-8 bg-slate-200 rounded-md p-6">
          <CheckoutButton userId={userId} cart={cart} />
        </div>
      </div>
    </Container>
  );
};

export default CartView;
