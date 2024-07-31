"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface SizeTypes {
  _id: String;
  name: String;
}

export const Size = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [sizes, setSize] = useState<SizeTypes[]>([]);

  const fetchSize = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/product/size`);
      setSize(response.data.get_size);
    } catch (error) {
      console.log(error);
      setError("Error getting products size.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSize();
  }, [fetchSize]);

  return {
    error,
    loading,
    sizes,
    fetchSize,
  };
};
