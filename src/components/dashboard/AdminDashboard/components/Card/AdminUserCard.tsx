"use client";
import React from "react";
import StatCard from "@/src/components/elements/StatCard";
import { FaUserCheck } from "react-icons/fa6";

export default function AdminUserCard({ stats, isLoading, error }: any) {
  return (
    <StatCard
      error={error}
      length={isLoading ? 0 : stats.get_admin_user.length}
      name={"Total Users"}
      svg={<FaUserCheck />}
    />
  );
}
