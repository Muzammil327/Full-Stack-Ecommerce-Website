"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { AdminStatsIprops, APIError } from "@/src/types/auth/page";

const GETAdminStatsAction = () => {
  const [loading1, setLoading1] = useState<boolean>(true);
  const [error1, setError1] = useState<string>("");
  const [adminStats, setAdminStats] = useState<AdminStatsIprops | null>(null);

  const fetchAdminStats = useCallback(async () => {
    try {
      setLoading1(true);
      const response = await axios.get(`/api/admin`);

      // Assuming the API response structure
      const statsData = response.data.counts;
      setAdminStats(statsData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError1((error as APIError).message || "Failed to fetch data");
      } else {
        setError1("Unexpected error occurred");
      }
    } finally {
      setLoading1(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminStats();
  }, [fetchAdminStats]);

  return {
    error1,
    loading1,
    adminStats,
    fetchAdminStats,
  };
};

export default GETAdminStatsAction;
