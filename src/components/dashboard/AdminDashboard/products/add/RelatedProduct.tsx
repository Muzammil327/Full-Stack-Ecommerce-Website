"use client";
import React, { useEffect, useState } from "react";
import Label from "@/src/components/ui/Label";
import Select from "react-select";
import axios from "axios";

export function RelatedProduct({ productId, setProductId }: any) {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleSelectChange = (selectedOptions: any) => {
    setProductId(selectedOptions);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const stats = await axios.get(`/api/admin/relatedproduct`);
      setData(stats.data.get_related_product);
    } catch (error) {
      console.error("Error fetching Product ID data:", error);
    } finally {
      setLoading(false);
    }
  };
  // ---------------------- Handle FETCH all data ----------------------
  useEffect(() => {
    fetchData();
  }, []);

  const options = data.map(({ _id, name }: any) => ({
    value: _id,
    label: name,
  }));

  if (error) return <h1>Error from color.</h1>;

  return (
    <div className="mb-6">
      <Label label="Related Product:" htmlFor="productId" />
      <Select
        isMulti
        options={options}
        onChange={handleSelectChange}
        value={loading ? [] : productId}
        className="mt-1"
      />
    </div>
  );
}
