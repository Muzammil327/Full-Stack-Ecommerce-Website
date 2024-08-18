"use client";
import React, { useEffect, useState } from "react";
import Container from "@/src/components/ui/Container";
import { useCart } from "@/src/components/context/cartContext";
import FetchCart from "@/src/components/cart/FetchCart";
import LoadingCart from "@/src/components/ui/Loading/LoadingCart";
import CheckoutButton from "@/src/components/cart/CheckoutButton";
import { Table } from "@/src/components/ui/ui";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";

interface UserData {
  email?: string;
  phone: string;
  address: string;
  image: string;
  country: string;
  city: string;
  zipCode: string;
  username: string;
  emailVerified: boolean;
}

const CartView = ({ userId }: { userId: string }) => {
  const { isFetching, cart, getToCartBtn } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/auth/address/${userId}`);
        const userDataFromApi = response.data.get_user_address;
        if (
          !userDataFromApi?.addressLine1 ||
          !userDataFromApi?.city ||
          !userDataFromApi?.country ||
          !userDataFromApi?.additionalInfo
        ) {
          if (!userDataFromApi.additionalInfo) {
            localStorage.setItem("lastVisitedPage", window.location.pathname);

            setTimeout(() => {
              router.push("/dashboard/address/");
            }, 5000);          
            return;
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId, router]);
  return (
    <Container>
      <div className="grid lg:grid-cols-6 grid-cols-1 gap-x-8 md:my-20 my-10">
        <div className="lg:col-span-4 col-span-1 relative overflow-x-auto sm:rounded-lg mb-10">
          <Table
            columns={["Image", "Name", "Qty", "Price", "Color", "Action"]}
            loading={isFetching}
            cellCount={6}
          >
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
          <CheckoutButton userId={userId} cart={cart} isLoading={isLoading} />
        </div>
      </div>
    </Container>
  );
};

export default CartView;
