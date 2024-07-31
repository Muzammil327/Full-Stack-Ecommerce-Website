"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface CatSizeTypes {
  _id: String;
  name: String;
}

interface SubCatSizeTypes {
  _id: String;
  name: String;
}

interface SizeTypes {
  _id: String;
  name: String;
  cat: CatSizeTypes[];
  subcat: SubCatSizeTypes[];
}

export const Items = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [items, setItems] = useState<SizeTypes[]>([]);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/product/items`);

      setItems(response.data.get_item);
    } catch (error) {
      console.log(error);
      setError("Error getting products items.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    error,
    loading,
    items,
    fetchItems,
  };
};
