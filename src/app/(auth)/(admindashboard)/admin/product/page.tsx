"use client";
import React, { useState } from "react";
import axios from "axios";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [files, setFiles] = useState<File[]>([]); // Specify the type as an array of File objects

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles as File[]); // Cast selectedFiles to an array of File objects
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.set("name", name);
      formData.append("basePrice", basePrice.toString());

      // Append each selected file to FormData
      files.forEach((file, index) => {
        // Append each file with a unique key to avoid overwriting
        formData.append(`file${index + 1}`, file);
      });

      // Verify FormData contents
      console.log("FormData:", formData);
      const response = await axios.post("http://localhost:8000/api/register", {
        name,
        basePrice,
        files,
      });

      console.log("response data:", response.data);

      const res = response.data;
      if (res.error) {
        setError(res.error);
      } else {
        setError(res.message);
      }
    } catch (error) {
      setError("Error during Product Category Update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-2">
      <div className="mx-auto max-w-2xl text-center">
        <h3 className="text-xl font-bold tracking-tight text-gray-900">
          Add Product Here
        </h3>
      </div>

      <form className="mt-5 sm:mt-10" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            {/* Input field for product name */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            {/* Input field for base price */}
            <input
              type="number"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
            />
          </div>
          <label htmlFor="productImage">Product Image:</label>
          <input
            type="file"
            id="productImage"
            onChange={handleFileChange}
            multiple
          />
          <button type="submit">
            {loading ? "Loading .." : "Submit Here"}
          </button>
        </div>
      </form>
    </div>
  );
}
