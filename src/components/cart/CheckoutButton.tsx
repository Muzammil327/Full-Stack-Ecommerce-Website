"use client";
import React, { useEffect, useState } from "react";
import { Button, Processing } from "@/src/components/ui/ui";
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
  isLoading,
}: {
  userId: string;
  cart: any;
  isLoading: any;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    // Calculate subtotal, total, and total tax when cart changes
    let subTotal = 0;
    let totalTax = 0;

    if (cart) {
      cart.forEach((item: CartItem) => {
        subTotal += item.product_Detail.price * item.qty;
        totalTax += item.product_Detail.deliveryCharge * item.qty;
      });
    }

    const total = subTotal;
    setSubtotal(subTotal);
    setTotal(total);
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
      setInterval(() => {
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setInterval(() => {
        setLoading(false);
      }, 3000);
    }
  };

  return (
    <React.Fragment>
      <div className="flex items-center justify-center pb-3 text-xl font-bold">
        <span>Cart Total</span>
      </div>
      <div className="total flex items-center justify-between mt-8">
        <span>Sub Total</span>
        <span>{subtotal}</span>
      </div>
      <div className="tax my-4 flex items-center justify-between">
        <span>Tax Charges</span>
        <span>0</span>
      </div>
      <div className="total border-t border-solid border-slate-300 py-5 flex items-center justify-between">
        <span>Total</span>
        <span>{total}</span>
      </div>
      <div className="checkout_btn">
        {cart.length === 0 ? null : (
          <Button
            type="submit"
            variant="solid"
            className="w-full flex items-center justify-center"
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
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <React.Fragment>
                {loading ? <Processing /> : "Proceed to Checkout"}
              </React.Fragment>
            )}
          </Button>
        )}
      </div>
    </React.Fragment>
  );
}
