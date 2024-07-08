"use client";
import { categories } from "@/src/components/data";
import Input from "@/src/components/ui/Loading/Input";
import Label from "@/src/components/ui/Label";
import { PRODUCT_POST } from "@/src/utils/constant";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Select from "react-select";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import Image from "next/image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { Button } from "@/src/components/ui/button";

const ProductAddPage = () => {
  const [loadings, setLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [Sdescription, setSdescription] = useState<string>("");
  const [Ldescription, setLdescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");
  const [items, setItems] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>(0);
  const [status, setStatus] = useState<string>("");
  const [isCheckedFreeDelivery, setIsCheckedFreeDelivery] = useState(false);
  const [isBestPriceCheckbox, setIsBestPriceCheckbox] = useState(false);
  const [isFeatureCheckbox, setIsFeatureCheckbox] = useState(false);
  const [isTopCheckbox, setIsTopCheckbox] = useState(false);
  interface Product {
    value: string;
    label: string;
  }
  const [productId, setProductId] = useState<Product[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [size, setSize] = useState<string[]>([]);

  // ---------------------- Handle Product Id Data Fetch Show Dropdown ----------------------
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const stats = await axios.get(`/api/auth/admin`);
      setData(stats.data.get_admin_product);
    } catch (error) {
      console.error("Error fetching Product ID data:", error);
    }
  };

  const handleSelectChange = (selectedOptions: any) => {
    setProductId(selectedOptions);
  };

  // ---------------------- Handle Single Image ----------------------
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImage(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setImageUrl(url);
    }
  };

  // ---------------------- Handle Slider Image ----------------------
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [slider, setSlider] = useState<File[]>([]);

  const handleImageSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      const urls = selectedFiles.map((file) => URL.createObjectURL(file));
      setSlider(selectedFiles);
      setImageUrls(urls);
    }
  };

  // ---------------------- Handle Delete Image ----------------------
  const handleDeleteImage = (index: number) => {
    const updatedSlider = slider.filter((_, i) => i !== index);
    const updatedUrls = imageUrls.filter((_, i) => i !== index);
    setSlider(updatedSlider);
    setImageUrls(updatedUrls);
  };

  // ---------------------- Handle tags ----------------------
  const handleTagsChange = (tags: string[]) => {
    setTags(tags);
  };

  // ---------------------- Handle size ----------------------
  const handleSizesChange = (sizes: string[]) => {
    setSize(sizes);
  };

  // ---------------------- Handle Product POST DATA ----------------------
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("Ldescription", Ldescription);
      formData.append("Sdescription", Sdescription);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("items", items);
      formData.append("status", status);
      formData.append("platform", platform);

      if (tags.length > 0) {
        tags.forEach((tags) => {
          formData.append("keywords", tags);
        });
      }

      if (size.length > 0) {
        size.forEach((size) => {
          formData.append("size", size);
        });
      }

      if (isCheckedFreeDelivery) {
        formData.append("freeDelivery", "true");
      }
      if (isBestPriceCheckbox) {
        formData.append("bestPrice", "true");
      }
      if (isFeatureCheckbox) {
        formData.append("feature", "true");
      }
      if (isTopCheckbox) {
        formData.append("top", "true");
      }

      if (image) {
        formData.append("image", image);
      }
      if (price !== undefined) {
        formData.append("price", price.toString()); // Convert price to string
      }
      if (productId.length > 0) {
        productId.forEach((product: any) => {
          formData.append("productId", JSON.stringify(product));
        });
      }
      slider.forEach((file) => {
        formData.append("slider", file);
      });
      const response = await axios.post(`${PRODUCT_POST}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.status === 200) {
        toast.success(response.data.message);

        setName("");
        setSdescription("");
        setLdescription("");
        setSubCategory("");
        setCategory("");
        setPrice(0);
        setProductId([]);
        setImage(null);
        setSlider([]);
        setImageUrl(null);
        setImageUrls([]);
        setIsCheckedFreeDelivery(false); // Reset checkbox state after submission
        setIsBestPriceCheckbox(false);
        setIsFeatureCheckbox(false);
        setIsTopCheckbox(false);
        setTags([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.warning("Some Field Empty");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------- Handle FETCH all data ----------------------
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit} className="container mx-auto px-12 my-10">
        {/* ----------------------- Product Image -----------------------  */}
        <div className="mb-6">
          <label
            htmlFor="image"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Cover Image
          </label>
          <div className="relative mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div>
              {imageUrl ? (
                <>
                  <Image
                    src={imageUrl}
                    alt="Selected Image"
                    className="text-center"
                    height={200}
                    width={200}
                  />
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
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ----------------------- Product Long Description -----------------------  */}
        <div className="mb-6">
          <Label label="Product Long Description:" htmlFor="ldescription" />
          <ReactQuill
            theme="snow"
            value={Ldescription}
            onChange={setLdescription}
          />
        </div>

        {/* ----------------------- Product Short Description -----------------------  */}
        <div className="mb-6">
          <Label label="Product Short Description:" htmlFor="sdescription" />
          <textarea
            value={Sdescription}
            onChange={(e) => setSdescription(e.target.value)}
            placeholder="Enter your product description."
            className="shadow-sm rounded-md w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>

        {/* ----------------------- Product Name -----------------------  */}
        <div className="mb-6">
          <Label label="Product Name:" htmlFor="productname" />
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name."
            type="text"
          />
        </div>

        {/* ----------------------- Product Catgeory and sub catgeory -----------------------  */}
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-6">
            <label className="block text-base font-medium text-gray-700">
              Category:
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full py-3 pl-3 bg-gray-50 border mt-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:transition-all hover:transition-all"
            >
              <option value="">Select Category</option>
              {categories.map((data) => (
                <option value={data.id} key={data.id}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-base font-medium text-gray-700">
              Sub Category:
            </label>
            <select
              id="subCatgeory"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="block w-full py-3 pl-3 bg-gray-50 border mt-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:transition-all hover:transition-all"
            >
              <option value="">Select Sub Category</option>
              {categories
                .filter((data) => data.id === category)
                .map((data) => (
                  <React.Fragment key={data.id}>
                    {data.subCategories?.map((subData) => (
                      <option value={subData.id} key={subData.id}>
                        {subData.name}
                      </option>
                    ))}
                  </React.Fragment>
                ))}
            </select>
          </div>
        </div>

        {/* ----------------------- Product Items and price -----------------------  */}
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-6">
            <label className="block text-base font-medium text-gray-700">
              Items:
            </label>
            <select
              id="items"
              value={items}
              onChange={(e) => setItems(e.target.value)}
              className="block w-full py-3 pl-3 bg-gray-50 border mt-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:transition-all hover:transition-all"
            >
              <option value="">Select Items</option>
              {categories
                .filter((data) => data.id === category)
                .map((data) => (
                  <React.Fragment key={data.id}>
                    {data.subCategories
                      ?.filter((subData) => subData.id === subCategory)
                      .map((subData) => (
                        <React.Fragment key={data.id}>
                          {subData.tags?.map((subData) => (
                            <option value={subData.id} key={subData.id}>
                              {subData.name}
                            </option>
                          ))}
                        </React.Fragment>
                      ))}
                  </React.Fragment>
                ))}
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="productprice"
              className="block text-base font-medium text-gray-700"
            >
              Product Price:
            </label>
            <input
              type="number"
              name="productprice"
              id="productprice"
              value={price || ""}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              placeholder="Enter your product price."
              className="w-full border border-gray-300 py-3 pl-3 rounded-md mt-2 shadow-sm outline-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:transition-all hover:transition-all"
            />
          </div>
        </div>

        {/* ----------------------- Product platform and status -----------------------  */}
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-6">
            <label className="block text-base font-medium text-gray-700">
              Platform:
            </label>
            <select
              id="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="block w-full py-3 pl-3 bg-gray-50 border mt-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:transition-all hover:transition-all"
            >
              <option value="">Select Platform</option>
              <option value="markaz">markaz</option>
              <option value="hhcdropshipping">hhcdropshipping</option>
              <option value="sadadropship">sadadropship</option>
              <option value="shoes">shoes</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-base font-medium text-gray-700">
              Status:
            </label>
            <select
              id="category"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="block w-full py-3 pl-3 bg-gray-50 border mt-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:transition-all hover:transition-all"
            >
              <option value="">Select Status</option>
              <option value="active">active</option>
              <option value="out of stock">out of stock</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-4 items-center justify-between my-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="freeDeliveryCheckbox"
              checked={isCheckedFreeDelivery}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const isCheckedFreeDelivery = e.target.checked;
                setIsCheckedFreeDelivery(isCheckedFreeDelivery);
              }}
            />
            <label
              className="form-check-label pl-2"
              htmlFor="freeDeliveryCheckbox"
            >
              Free Delivery
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="bestPriceCheckbox"
              checked={isBestPriceCheckbox}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const isBestPriceCheckbox = e.target.checked;
                setIsBestPriceCheckbox(isBestPriceCheckbox);
              }}
            />
            <label
              className="form-check-label pl-2"
              htmlFor="bestPriceCheckbox"
            >
              Best Price
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="featureCheckbox"
              checked={isFeatureCheckbox}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const isFeatureCheckbox = e.target.checked;
                setIsFeatureCheckbox(isFeatureCheckbox);
              }}
            />
            <label className="form-check-label pl-2" htmlFor="featureCheckbox">
              Featured
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="topCheckbox"
              checked={isTopCheckbox}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const isTopCheckbox = e.target.checked;
                setIsTopCheckbox(isTopCheckbox);
              }}
            />
            <label className="form-check-label pl-2" htmlFor="topCheckbox">
              Top
            </label>
          </div>
        </div>

        {/* ----------------------- Product Keywords -----------------------  */}
        <div className="mb-6">
          <label
            htmlFor="productId"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Keywords
          </label>
          <TagsInput value={tags} onChange={handleTagsChange} />
        </div>
        {/* ----------------------- Product Size -----------------------  */}
        <div className="mb-6">
          <label
            htmlFor="productId"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Size
          </label>
          <TagsInput value={size} onChange={handleSizesChange} />
        </div>

        {/* ----------------------- Product Related -----------------------  */}
        <div className="mb-6">
          <label
            htmlFor="productId"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Related Product
          </label>
          <Select
            isMulti
            options={
              data.map(({ _id, name }) => ({
                value: _id,
                label: name,
              })) as any[]
            }
            onChange={handleSelectChange}
            value={productId}
          />
        </div>

        {/* ----------------------- Product image slider -----------------------  */}
        <div className="mb-6">
          <label
            htmlFor="slider"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Slider Image
          </label>
          <div className="relative mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div>
              {imageUrls.length > 0 ? (
                <>
                  <div className="grid grid-cols-3 gap-6">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={url}
                          alt={`Selected Image ${index + 1}`}
                          className="h-40 w-full object-cover rounded-md"
                          height={500}
                          width={500}
                        />
                        <Button
                          onClick={() => handleDeleteImage(index)}
                          variant="icon"
                          round="md"
                        >
                          X
                        </Button>
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
        <Button variant="paddingWidth" round="md">
          {loadings ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </>
  );
};

export default ProductAddPage;
