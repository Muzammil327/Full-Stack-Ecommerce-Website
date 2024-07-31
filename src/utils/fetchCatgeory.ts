"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface SizeTypes {
  _id: String;
  name: String;
}

export const Catgeory = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [categories , setCategories] = useState<SizeTypes[]>([]);

  const fetchCatgeory = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/product/catgeory`);
      setCategories(response.data.get_catgeory);
    } catch (error) {
      console.log(error);
      setError("Error getting products catgeory.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCatgeory();
  }, [fetchCatgeory]);

  return {
    error,
    loading,
    categories,
    fetchCatgeory,
  };
};
