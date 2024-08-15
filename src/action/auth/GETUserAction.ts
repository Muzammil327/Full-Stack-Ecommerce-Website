"use client";
import { UserIprops } from "@/src/types/auth/page";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const GETUserAction = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<UserIprops | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/auth/address/${userId}`);
      const userDataFromApi = response.data.get_user_address;
      setData(userDataFromApi);
    } catch (error) {
      console.log(error);
      setError("Error getting products catgeory.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [fetchUser, userId]);

  return {
    error,
    loading,
    data,
    fetchUser,
  };
};

export default GETUserAction;
