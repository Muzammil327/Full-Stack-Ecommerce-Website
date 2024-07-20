"use client";
import axios from "axios";
import { useState, useEffect } from "react";

const useProductDetails = (params: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/product/${params}`);
        setData(response.data.singleProduct);
      } catch (err) {
        setError("Failed to fetch product data");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [params]);

  return { data, loading, error };
};

export default useProductDetails;
