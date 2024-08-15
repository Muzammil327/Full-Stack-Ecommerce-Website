import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface SizeTypes {
  _id: String;
  name: String;
}

const GETAdminCatgeoryAction = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [categories, setCategories] = useState<SizeTypes[]>([]);

  const fetchCatgeory = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/admin/catgeory`);
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

export default GETAdminCatgeoryAction;

interface SizeResponse {
  singleCatgeory: {
    _id: string;
    name: string;
  };
}

interface EditAdminColorActionProps {
  catgeoryId: string;
  catgeory: string;
  setCatgeory: React.Dispatch<React.SetStateAction<string>>;
}

export const EditAdminCatgeoryAction = ({
  catgeoryId,
  catgeory,
  setCatgeory,
}: EditAdminColorActionProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSingleCatgeory = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        setError(null); // Reset error before making a new request

        const response = await axios.get<SizeResponse>(
          `/api/admin/catgeory/${id}`
        );
        if (response.data.singleCatgeory) {
          setCatgeory(response.data.singleCatgeory.name);
        } else {
          setError("Product size not found.");
        }
      } catch (err) {
        console.error("Error getting product size:", err);
        setError("Failed to fetch product size. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [setCatgeory]
  );

  useEffect(() => {
    if (catgeoryId) {
      fetchSingleCatgeory(catgeoryId);
    }
  }, [fetchSingleCatgeory, catgeoryId]);

  return {
    catgeory,
    loading,
    error,
    fetchSingleCatgeory,
  };
};
