"use client";
import React, { useEffect, useState } from "react";
import StatCard from "@/src/components/elements/StatCard";
import axios from "axios";
import { USER_API_Endpoint } from "@/src/utils/constant";
import { FaUserCheck } from "react-icons/fa6";

export default function AdminUserCard() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${USER_API_Endpoint}/stats`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data:");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <StatCard
      error={error}
      length={isLoading ? 0 : data.length}
      name={"Total Users"}
      svg={<FaUserCheck />}
    />
  );
}
