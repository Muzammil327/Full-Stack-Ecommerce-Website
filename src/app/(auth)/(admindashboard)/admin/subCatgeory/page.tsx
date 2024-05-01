"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "@/src/app/(auth)/form.module.css";

interface FormData {
  title: string;
  categoryId: string;
}

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [catgeoryData, setCatgeoryData] = useState<FormData>({
    title: "",
    categoryId: "",
  });

  const [fetchCat, setFetchCat] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/products/category");

        setFetchCat(response.data.catgeoryProduct);
      } catch (error) {
        setError("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "/api/products/subCategory",
        catgeoryData
      );
      const res = response.data;
      if (res.error) {
        setError(res.error);
      } else {
        setError(res.message);
        setCatgeoryData({ title: "", categoryId: "" });
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
          Add Product Catgeory Here
        </h3>
      </div>

      <form className="mt-5 sm:mt-10" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="catgeory-name" className={style.label}>
              Catgeory Name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="catgeory-name"
                id="catgeory-name"
                autoComplete="catgeory-name"
                className={style.input}
                value={catgeoryData.title}
                onChange={(e) =>
                  setCatgeoryData({ ...catgeoryData, title: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label htmlFor="category" className={style.label}>
              Category
            </label>
            <div className="mt-2.5">
              <select
                id="category"
                name="category"
                className={style.input}
                value={catgeoryData.categoryId}
                onChange={(e) =>
                  setCatgeoryData({
                    ...catgeoryData,
                    categoryId: e.target.value,
                  })
                }
              >
                <option value="">Select a category</option>
                {fetchCat.map((option: any) => (
                  <option key={option._id} value={option._id}>
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className={`sm:col-span-2 ${style.btn}`}>
            {loading ? "Loading .." : "Submit Here"}
          </button>
        </div>
      </form>
    </div>
  );
}
