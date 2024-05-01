"use client";
import { useState } from "react";
import axios from "axios";
import style from "@/src/app/(auth)/form.module.css";

interface FormData {
  phone: string;
  address: string;
  country: string;
  city: string;
  zipCode: string;
}
export default function Address() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [addressData, setAddressData] = useState<FormData>({
    phone: "",
    address: "",
    country: "",
    city: "",
    zipCode: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put("/api/products/update", addressData);
      const res = response.data;

      if (res.error) {
        setError(res.error);
      } else {
        setError(res.message);
        setAddressData({
          phone: "",
          address: "",
          country: "",
          city: "",
          zipCode: "",
        });
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
          Add Detail Here
        </h3>
      </div>

      <form className="mt-5 sm:mt-10" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="catgeory-name" className={style.label}>
              Phone Number
            </label>
            <div className="mt-2.5">
              <input
                type="number"
                id="phone"
                name="phone"
                placeholder="(0123) 456-7890" // Updated placeholder with the correct format
                pattern="\(\d{3}\) \d{3}-\d{4}" // Pattern for the formatted phone number
                maxLength={12} // Maximum length of formatted phone number
                minLength={12} // Minimum length of formatted phone number
                className={style.input}
                value={addressData.phone}
                onChange={(e) =>
                  setAddressData({ ...addressData, phone: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label htmlFor="catgeory-name" className={style.label}>
              Address
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter Your Address"
                className={style.input}
                value={addressData.address}
                onChange={(e) =>
                  setAddressData({ ...addressData, address: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label htmlFor="catgeory-name" className={style.label}>
              Country
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                id="country"
                name="country"
                className={style.input}
                value={addressData.country}
                placeholder="Enter Your Country"
                onChange={(e) =>
                  setAddressData({ ...addressData, country: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label htmlFor="catgeory-name" className={style.label}>
              City
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter Your City"
                className={style.input}
                value={addressData.city}
                onChange={(e) =>
                  setAddressData({ ...addressData, city: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label htmlFor="catgeory-name" className={style.label}>
              Zip Code
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                placeholder="Enter Your Zip Code"
                className={style.input}
                value={addressData.zipCode}
                onChange={(e) =>
                  setAddressData({ ...addressData, zipCode: e.target.value })
                }
              />
            </div>
          </div>

          <button type="submit" className={`sm:col-span-2 ${style.btn}`}>
            {loading ? "Loading .." : "Update Here"}
          </button>
        </div>
      </form>
    </div>
  );
}
