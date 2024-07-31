"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface SizeTypes {
  _id: String;
  name: String;
}

export const Color = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [color, setSize] = useState<SizeTypes[]>([]);

  const fetchColor = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/product/color`);
      setSize(response.data.get_color);
    } catch (error) {
      console.log(error);
      setError("Error getting products color.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchColor();
  }, [fetchColor]);

  return {
    error,
    loading,
    color,
    fetchColor,
  };
};
