"use client";
import { Product_PUT_Slider } from "@/src/utils/constant";
import axios from "axios";
import { useParams } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const Page = () => {
  const { id } = useParams();

  const [loadings2, setLoading2] = useState<boolean>(false);
  const [errors, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [slider, setSlider] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleSubmitImage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading2(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const formData = new FormData();
      slider.forEach((file) => {
        formData.append("slider", file);
      });
      await axios.put(`${Product_PUT_Slider}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage("Product added Successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading2(false);
    }
  };

  const handleImageSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      const urls = selectedFiles.map((file) => URL.createObjectURL(file));
      setSlider(selectedFiles);
      setImageUrls(urls);
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedSlider = slider.filter((_, i) => i !== index);
    const updatedUrls = imageUrls.filter((_, i) => i !== index);
    setSlider(updatedSlider);
    setImageUrls(updatedUrls);
  };

  return (
    <>
      <form
        onSubmit={handleSubmitImage}
        className="container mx-auto px-12 my-10"
      >
        {errors && <div className="error-message">{errors}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <div className="mb-6">
          <label
            htmlFor="image"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Cover Image
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              {imageUrls.length > 0 ? (
                <>
                  <div className="grid grid-cols-3 gap-6">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Selected Image ${index + 1}`}
                          className="h-40 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-red-500 h-6 w-6 rounded-full text-white flex items-center justify-center"
                          onClick={() => handleDeleteImage(index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="image"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a Banner Image</span>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        className="sr-only"
                        onChange={handleImageSliderChange}
                        multiple
                      />
                    </label>
                  </div>
                </>
              ) : (
                <>
                  <svg
                    className="mx-auto h-12 w-12 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="image"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a Banner Image</span>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        className="sr-only"
                        onChange={handleImageSliderChange}
                        multiple
                      />
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loadings2 ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default Page;
