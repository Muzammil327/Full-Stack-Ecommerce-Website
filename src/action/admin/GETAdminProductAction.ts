"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { PaginationProps, AdminProductProps } from "@/src/types/product";

const GETAdminProductAction = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [pagination, setPagination] = useState<PaginationProps | undefined>();
  const [products, setProducts] = useState<AdminProductProps[]>([]);

  const [page, setPage] = useState(1);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get<{
        products: AdminProductProps[];
        pagination: PaginationProps;
      }>(`/api/admin/product?page=${page}`);
      if (page === 1) {
        setProducts(response.data.products);
      } else {
        setProducts((prevData) => [...prevData, ...response.data.products]);
      }
      setPagination(response.data.pagination);
    } catch (error) {
      console.log(error);
      setError("Error getting products card.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    error,
    loading,
    fetchProduct,
    pagination,
    products,
    page,
    setPage,
  };
};

export default GETAdminProductAction;

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
