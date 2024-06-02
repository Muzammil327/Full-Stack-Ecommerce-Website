"use client";
import { useAuth } from "@/src/components/contexts/authContext";
import StatCard from "@/src/components/elements/StatCard";
import { Cart_API_Endpoint } from "@/src/utils/constant";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";

export default function ProfileCartCard() {
  const { user } = useAuth();

  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${Cart_API_Endpoint}/get/${user}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data:");
      } finally {
        setIsLoading(false);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);
  return (
    <Link href="/cart">
      <StatCard
        error={error}
        length={isLoading ? 0 : data.length}
        name={"Total Carts"}
        svg={<FaCartShopping />}
      />
    </Link>
  );
}
