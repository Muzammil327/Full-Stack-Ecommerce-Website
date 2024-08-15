import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface SizeTypes {
  _id: String;
  name: String;
}

const GETAdminItemAction = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [items, setItems] = useState<SizeTypes[]>([]);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/admin/items`);

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

export default GETAdminItemAction;

interface EditAdminColorActionProps {
  itemId: string;
}

interface Category {
  _id: string;
  name: string;
}

interface ItemData {
  _id: string;
  name: string;
  cat: Category[];
  subcat: Category[];
}

export const EditAdminItemAction = ({ itemId }: EditAdminColorActionProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ItemData | null>(null);
  console.log(data);

  const fetchSingleColor = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null); // Reset error before making a new request

      const response = await axios.get(`/api/admin/items/${id}`);
      const itemData = response.data.singleItems;

      console.log("Fetched data:", itemData);

      if (itemData) {
        setData(itemData); // Set the data to state
      } else {
        setData(null); // Handle the case where no data is returned
      }
    } catch (err) {
      console.error("Error getting product size:", err);
      setError("Failed to fetch product size. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (itemId) {
      fetchSingleColor(itemId);
    }
  }, [fetchSingleColor, itemId]);

  return {
    data,
    loading,
    error,
    fetchSingleColor,
  };
};
