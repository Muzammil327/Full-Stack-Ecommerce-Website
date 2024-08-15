import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface SizeTypes {
  _id: String;
  name: String;
}

const GETAdminSubCatgeoryAction = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [subCatgeory, setSubCatgeory] = useState<SizeTypes[]>([]);

  const fetchSubCatgeory = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/admin/subcatgeory`);
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

export default GETAdminSubCatgeoryAction;

interface EditAdminColorActionProps {
  subcatgeoryId: string;
}

interface Category {
  _id: string;
  name: string;
}

interface SubCategoryData {
  _id: string;
  name: string;
  cat: Category[];
}

export const EditAdminSubCatgeoryAction = ({
  subcatgeoryId,
}: EditAdminColorActionProps) => {
  const [loading1, setLoading] = useState<boolean>(true);
  const [error1, setError] = useState<string | null>(null);
  const [data, setData] = useState<SubCategoryData[]>([]);

  const fetchSingleColor = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        setError(null); // Reset error before making a new request

        const response = await axios.get(`/api/admin/subcatgeory/${id}`);
        if (response.data.singleSubCatgeory) {
          setData(response.data.singleSubCatgeory);
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
    [setData]
  );

  useEffect(() => {
    if (subcatgeoryId) {
      fetchSingleColor(subcatgeoryId);
    }
  }, [fetchSingleColor, subcatgeoryId]);

  return {
    data,
    loading1,
    error1,
    fetchSingleColor,
  };
};
