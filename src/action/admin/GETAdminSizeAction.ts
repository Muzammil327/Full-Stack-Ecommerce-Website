import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface SizeTypes {
  _id: String;
  name: String;
}

const GETAdminSizeAction = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [sizes, setSize] = useState<SizeTypes[]>([]);

  const fetchSize = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/admin/size`);
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

export default GETAdminSizeAction;

interface SizeResponse {
  singleSize: {
    _id: string;
    name: string;
  };
}

interface EditAdminSizeActionProps {
  sizeId: string;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

export const EditAdminSizeAction = ({
  sizeId,
  name,
  setName,
}: EditAdminSizeActionProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSingleSize = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        setError(null); // Reset error before making a new request

        const response = await axios.get<SizeResponse>(
          `/api/admin/size/${id}`
        );
        if (response.data.singleSize) {
          setName(response.data.singleSize.name);
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
    [setName]
  );

  useEffect(() => {
    if (sizeId) {
      fetchSingleSize(sizeId);
    }
  }, [fetchSingleSize, sizeId]);

  return {
    name,
    loading,
    error,
    fetchSingleSize,
  };
};
