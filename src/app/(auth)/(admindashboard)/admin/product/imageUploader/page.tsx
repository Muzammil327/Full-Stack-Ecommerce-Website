"use client";
import { CldUploadWidget } from "next-cloudinary";
import React, { useState } from "react";

interface FormData {
  imageUrl: string | null;
}

export default function ImageUploader() {
  const [productData, setProductData] = useState<FormData>({
    imageUrl: null,
  });

  const handleUploadSuccess = (result: any) => {
    if (result.event === "success") {
      setProductData({
        ...productData,
        imageUrl: result.info.secure_url,
      });
    }
  };

  return (
    <div>
      <CldUploadWidget uploadPreset="jlciukfo" onSuccess={handleUploadSuccess}>
        {({ open }) => {
          return <button onClick={() => open()}>Upload an Image</button>;
        }}
      </CldUploadWidget>

      {productData.imageUrl && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={productData.imageUrl} alt="Uploaded" />
        </div>
      )}
    </div>
  );
}
