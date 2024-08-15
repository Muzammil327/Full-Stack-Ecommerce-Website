import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { AdminOrder } from "@/src/types/order/page";
import { APIError } from "@/src/types/auth/page";

const GETAdminOrderAction = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [adminOrder, setAdminOrder] = useState<AdminOrder[]>([]);

  const fetchAdminOrder = useCallback(async (status?: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/admin/order`, {
        params: { status },
      });
      setAdminOrder(response.data.getTotalOrder);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError((error as APIError).message || "Failed to fetch data");
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminOrder();
  }, [fetchAdminOrder]);

  return {
    error,
    loading,
    adminOrder,
    fetchAdminOrder,
  };
};

export default GETAdminOrderAction;
