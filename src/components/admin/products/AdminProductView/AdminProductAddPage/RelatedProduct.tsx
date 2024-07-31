'use client'
import React, { useEffect, useState } from "react";
import Label from "@/src/components/ui/Label";
import Select from "react-select";
import axios from "axios";

export function RelatedProduct({ productId, setProductId }: any) {
  const [data, setData] = useState([]);
  const handleSelectChange = (selectedOptions: any) => {
    setProductId(selectedOptions);
  };

  const fetchData = async () => {
    try {
      const stats = await axios.get(`/api/auth/admin`);
      setData(stats.data.get_admin_product);
    } catch (error) {
      console.error("Error fetching Product ID data:", error);
    }
  };
  // ---------------------- Handle FETCH all data ----------------------
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="mb-6">
      <Label label="Related Product:" htmlFor="productId" />
      <Select
        isMulti
        options={
          data.map(({ _id, name }: any) => ({
            value: _id,
            label: name,
          })) as any[]
        }
        onChange={handleSelectChange}
        value={productId}
        className="mt-1"
      />
    </div>
  );
}
