"use client";
import React, { useEffect, useState } from "react";
import Button from "@/src/components/ui/Button";
import Processing from "@/src/components/ui/Loading/Processing";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CartItem } from "@/src/types/page";

interface Product {
  product: string;
  qty: number;
}
export default function CheckoutButton({
  userId,
  cart,
}: {
  userId: string;
  cart: any;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [totalTax, setTotalTax] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    // Calculate subtotal, total, and total tax when cart changes
    let subTotal = 0;
    let totalTax = 0;

    if (cart) {
      cart.forEach((item: CartItem) => {
        subTotal +=
          (item.product_Detail.price - item.product_Detail.discountprice) *
          item.qty;
        totalTax += item.product_Detail.deliveryCharge * item.qty;
      });
    }

    const total = subTotal + totalTax;
    setSubtotal(subTotal);
    setTotal(total);
    setTotalTax(totalTax);
  }, [cart]);

  const handleSubmit = async (products: Product[]) => {
    setLoading(true);
    try {
      await Promise.all(
        products.map(async (product) => {
          await axios.post(`/api/pendingOrder`, {
            productId: product.product, // Send only the product ID
            qty: product.qty, // Send the quantity
            userId,
          });
        })
      );
      router.push("/checkout");
      setLoading(false);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
      <div className="total border-t border-solid border-slate-300 py-5 flex items-center justify-between">
        <span>Total</span>
        <span>{total}</span>
      </div>
      <div className="checkout_btn">
        {cart.length === 0 ? null : (
          <Button
            className="button_bg w-full"
            onClick={() =>
              handleSubmit(
                cart.map((item: CartItem) => ({
                  product: item.product_Detail._id,
                  qty: item.qty,
                }))
              )
            }
            disabled={loading}
          >
            {loading ? <Processing /> : "Proceed to Checkout"}
          </Button>
        )}
      </div>
    </>
  );
}
