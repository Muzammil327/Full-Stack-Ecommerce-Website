"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  AdminStatsIprops,
  APIError,
  UserStatsIprops,
} from "@/src/types/auth/page";

const GETUserStatsAction = ({ userId }: { userId: string }) => {
  const [loading1, setLoading1] = useState<boolean>(true);
  const [error1, setError1] = useState<string>("");
  const [userStats, setUserStats] = useState<UserStatsIprops | null>(null);

  const fetchUserStats = useCallback(async (userId: string) => {
    try {
      setLoading1(true);
      const response = await axios.get(`/api/user?userId=${userId}`);

      // Assuming the API response structure
      const statsData = response.data.counts;
      setUserStats(statsData);
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
    fetchUserStats(userId);
  }, [fetchUserStats, userId]);

  return {
    error1,
    loading1,
    userStats,
    fetchUserStats,
  };
};

export default GETUserStatsAction;
