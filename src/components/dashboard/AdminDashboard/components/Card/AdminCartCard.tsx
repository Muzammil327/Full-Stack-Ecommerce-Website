import StatCard from "@/src/components/elements/StatCard";
import React from "react";
import { FaCartShopping } from "react-icons/fa6";

export default function AdminCartCard({ stats, error, isLoading }: any) {
  return (
    <StatCard
      error={error}
      length={isLoading ? 0 : stats.get_admin_cart.length}
      name={"Total Carts"}
      svg={<FaCartShopping />}
    />
  );
}
