"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface CATSizeTypes {
  _id: String;
  name: String;
}

interface SizeTypes {
  _id: String;
  name: String;
  cat: CATSizeTypes[];
}

export const SubCatgeory = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [subCatgeory, setSubCatgeory] = useState<SizeTypes[]>([]);

  const fetchSubCatgeory = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/product/subcatgeory`);
      setSubCatgeory(response.data.get_subcatgeory);
    } catch (error) {
      console.log(error);
      setError("Error getting products sub catgeory.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubCatgeory();
  }, [fetchSubCatgeory]);

  return {
    error,
    loading,
    subCatgeory,
    fetchSubCatgeory,
  };
};
