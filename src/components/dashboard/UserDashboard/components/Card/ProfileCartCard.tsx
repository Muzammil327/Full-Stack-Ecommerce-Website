"use client";
import { useCart } from "@/src/components/context/cartContext";
import StatCard from "@/src/components/elements/StatCard";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";

export default function ProfileCartCard() {
  const { isFetching, cart } = useCart();

  return (
    <Link href="/cart">
      <StatCard
        length={isFetching ? 0 : cart.length}
        name={"Total Carts"}
        svg={<FaCartShopping />}
      />
    </Link>
  );
}
