"use client";
import Button from "@/src/components/ui/Button";
import Label from "@/src/components/ui/Label";
import Image from "next/image";
import React, { ChangeEvent } from "react";
import { toast } from "react-toastify";

export default function ProductSliderImage({
  imageUrls,
  setImageUrls,
  slider,
  setSlider,
}: {
  imageUrls: string[];
  setImageUrls: (imageURL: string[]) => void;
  slider: File[];
  setSlider: (sliderId: File[]) => void;
}) {
  const handleDeleteImage = (index: number) => {
    const updatedSlider = slider.filter((_, i) => i !== index);
    const updatedUrls = imageUrls.filter((_, i) => i !== index);
    setSlider(updatedSlider);
    setImageUrls(updatedUrls);
  };

  const handleImageSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      const urls = selectedFiles.map((file) => URL.createObjectURL(file));
      toast.success("Successfully Image.")
      setSlider(selectedFiles);
      setImageUrls(urls);
    }
  };
  return (
    <div className="mb-6">
      <Label label="Slider Image:" htmlFor="slider" />

      <div className="relative mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div>
          {imageUrls.length > 0 ? (
            <>
              <div className="grid lg:grid-cols-4 grid-cols-2 gap-6">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={url}
                      alt={`Selected Image ${index + 1}`}
                      className="object-cover rounded-md"
                      height={500}
                      width={500}
                    />
                    <Button onClick={() => handleDeleteImage(index)} className="button_outline w-full mt-4 rounded-md">X</Button>
                  </div>
                ))}
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
                  htmlFor="slider"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a Banner Image</span>
                  <input
                    id="slider"
                    name="slider"
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
  );
}
