import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface SizeTypes {
  _id: String;
  name: String;
}

const GETAdminColorAction = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [color, setColors] = useState<SizeTypes[]>([]);

  const fetchColor = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/admin/color`);
      setColors(response.data.get_color);
    } catch (error) {
      console.log(error);
      setError("Error getting products size.");
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

export default GETAdminColorAction;

interface SizeResponse {
  singleColor: {
    _id: string;
    name: string;
  };
}

interface EditAdminColorActionProps {
  colorId: string;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

export const EditAdminColorAction = ({
  colorId,
  color,
  setColor,
}: EditAdminColorActionProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSingleColor = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        setError(null); // Reset error before making a new request

        const response = await axios.get<SizeResponse>(
          `/api/admin/color/${id}`
        );
        console.log(response.data);
        if (response.data.singleColor) {
          setColor(response.data.singleColor.name);
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
    [setColor]
  );

  useEffect(() => {
    if (colorId) {
      fetchSingleColor(colorId);
    }
  }, [fetchSingleColor, colorId]);

  return {
    color,
    loading,
    error,
    fetchSingleColor,
  };
};
