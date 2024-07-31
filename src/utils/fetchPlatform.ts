"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface PlatformTypes {
  _id: string;
  name: String;
  shipping: number;
}

export const Platform = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [platforms, setPlatform] = useState<PlatformTypes[]>([]);

  const fetchPlatform = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/product/platform`);
      setPlatform(response.data.get_platform);
    } catch (error) {
      console.log(error);
      setError("Error getting products card.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlatform();
  }, [fetchPlatform]);

  return {
    error,
    loading,
    platforms,
    fetchPlatform,
  };
};
