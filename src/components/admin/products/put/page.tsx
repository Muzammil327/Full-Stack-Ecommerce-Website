"use client";
import { Input, Label } from "@/src/components/ui/ui";
import {
  PRODUCT_DELETE_IMAGE,
  PRODUCT_DELETE_SLIDER_IMAGE,
  PRODUCT_GET_BY_ID,
  PRODUCT_PUT,
} from "@/src/utils/constant";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import Select, { ActionMeta, OnChangeValue } from "react-select";
import Image from "next/image";
import { categories } from "@/src/components/data";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Option {
  value: string;
  label: string;
}
const AdminProductPut = () => {
  const { put } = useParams();

  const [loadings1, setLoading1] = useState<boolean>(false);
  const router = useRouter();

  const [errors, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // form step 1
  const [data, setData] = useState([]);
  const [name, setName] = useState<string>("");
  const [Sdescription, setSdescription] = useState<string>("");
  const [Ldescription, setLdescription] = useState<string>("");

  const [platform, setPlatform] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [items, setItems] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [productId, setProductId] = useState<Option[]>([]);
  const [price, setPrice] = useState<number | undefined>(0);
  const [deliveryCharge, setDeliveryCharge] = useState<number | undefined>(0);
  const [discountprice, setDiscountPrice] = useState<number | undefined>(0);
  const [quantity, setQuantity] = useState<number | undefined>(0);
  const [imageDeleted, setImageDeleted] = useState(false);

  const [storeImage, setStoreImage] = useState<File | null>(null);

  const [tags, setTags] = useState<string[]>([]);

  const [isCheckedFreeDelivery, setIsCheckedFreeDelivery] = useState(false);
  const [isBestPriceCheckbox, setIsBestPriceCheckbox] = useState(false);
  const [isFeatureCheckbox, setIsFeatureCheckbox] = useState(false);
  const [isTopCheckbox, setIsTopCheckbox] = useState(false);

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [slider, setSlider] = useState<File[]>([]);
  const [size, setSize] = useState<string[]>([]);

  // Function to handle image selection
  const handleImageSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSlider(filesArray);
    }
  };

  const handleSelectChange = (
    selectedOptions: OnChangeValue<Option, true>,
    actionMeta: ActionMeta<Option>
  ) => {
    if (selectedOptions) {
      const optionsArray = Array.isArray(selectedOptions)
        ? selectedOptions
        : [selectedOptions];
      setProductId(optionsArray);
    } else {
      setProductId([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/auth/admin`);
        setData(response.data.get_admin_product);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData(); // Call fetchData function to fetch user data
  }, [put]); // useEffect dependency

  const fetchData1 = useCallback(async () => {
    try {
      const response = await axios.get(`${PRODUCT_GET_BY_ID}/${put}`);
      setName(response.data.name);
      setPlatform(response.data.platform);
      setDeliveryCharge(response.data.deliveryCharge);
      setSdescription(response.data.Sdescription);
      setLdescription(response.data.Ldescription);
      setCategory(response.data.category);
      setSubCategory(response.data.subCategory);
      setItems(response.data.items);
      setStatus(response.data.status);
      setStoreImage(response.data.image);
      setImageUrls(response.data.slider);
      setIsCheckedFreeDelivery(response.data.freeDelivery);
      setIsBestPriceCheckbox(response.data.bestPrice);
      setIsFeatureCheckbox(response.data.feature);
      setIsTopCheckbox(response.data.top);
      setTags(response.data.keywords);
      setSize(response.data.size);
      if (response.data.product) {
        const productArray = response.data.product.map((item: any) => ({
          value: item.value,
          label: item.label,
        }));
        setProductId(productArray);
      }

      setPrice(response.data.price);
      setDiscountPrice(response.data.discountprice);
      setQuantity(response.data.quantity);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }, [put]);
  // Call fetchData function to fetch user data

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    // if (image) {
    try {
      if (imageDeleted && !image) {
        console.log(
          "Image deleted without replacement. Form submission prevented."
        );
        return;
      }
      setLoading1(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("Sdescription", Sdescription);
      formData.append("Ldescription", Ldescription);
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
      if (discountprice !== undefined) {
        formData.append("discountprice", discountprice.toString()); // Convert price to string
      }
      if (deliveryCharge !== undefined) {
        formData.append("deliveryCharge", deliveryCharge.toString()); // Convert price to string
      }
      if (quantity !== undefined) {
        formData.append("quantity", quantity.toString()); // Convert price to string
      }
      if (productId.length > 0) {
        productId.forEach((product: any) => {
          formData.append("product", JSON.stringify(product));
        });
      }
      slider.forEach((file) => {
        formData.append("slider", file);
      });
      await axios.put(`${PRODUCT_PUT}/${put}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage("Product udated Successfully!");
      setName("");
      setSdescription("");
      setLdescription("");
      setSubCategory("");
      setCategory("");
      setDiscountPrice(0);
      setPrice(0);
      setQuantity(0);
      setProductId([]);
      setImage(null);
      setImageUrl(null);
      setIsCheckedFreeDelivery(false); // Reset checkbox state after submission
      setIsBestPriceCheckbox(false);
      setIsFeatureCheckbox(false);
      setIsTopCheckbox(false);
      setTags([]);
      router.push("/admin/products");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading1(false);
    }
    // }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImage(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setImageUrl(url);
    }
  };

  const handleTagsChange = (tags: string[]) => {
    setTags(tags);
  };

  // ---------------------- Handle size ----------------------
  const handleSizesChange = (sizes: string[]) => {
    setSize(sizes);
  };

  const deleteImage = async (publicId: any) => {
    try {
      setImageDeleted(true);

      await axios.delete(
        `${PRODUCT_DELETE_IMAGE}?publicId=${publicId}&&id=${put}`
      );
      setImage(null);
      setImageUrl(null);
      setStoreImage(null);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const fetchSliderImages = useCallback(async () => {
    try {
      const response = await axios.get(`${PRODUCT_GET_BY_ID}/${productId}`);
      setImageUrls(response.data.slider);
    } catch (error) {
      console.error("Error fetching slider images:", error);
    }
  }, [productId]); // Dependency on productId

  // useEffect to fetch slider images when component mounts or productId changes
  useEffect(() => {
    fetchData1();
  }, [fetchData1]); // useEffect depends on fetchSliderImages function

  const deleteSliderImage = async (publicId: any) => {
    try {
      await axios.delete(
        `${PRODUCT_DELETE_SLIDER_IMAGE}?publicId=${publicId}&&id=${put}`
      );
      fetchSliderImages();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <>
      <form className="container mx-auto px-12 my-10" onSubmit={handleSubmit}>
        {errors && <div className="error-message">{errors}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {/* ----------------------- Product Image -----------------------  */}
        <div className="mb-6">
          <label
            htmlFor="image"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Cover Image
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            {storeImage ? (
              <div className="relative">
                <Image src={`${storeImage}`} alt="" height={500} width={500} />
                <input
                  type="submit"
                  className="absolute top-1 right-1 bg1 h-10 w-10 flex items-center justify-center"
                  onClick={() => {
                    deleteImage(storeImage);
                  }}
                  value="X"
                />
              </div>
            ) : null}
            <div className="text-center">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Selected Image"
                  className="mx-auto h-40"
                  height="400"
                  width="400"
                />
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
            type="text" name={"productname"}          />
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
              ))}{" "}
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
                ))}{" "}
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
                ))}{" "}
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

        {/* ---------------------- Product Keywords -----------------------  */}
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
            htmlFor="slider"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Slider Image
          </label>
          <div className="relative mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div>
              {imageUrls.length > 0 && (
                <div className="grid grid-cols-3 gap-6">
                  {imageUrls.map((index) => (
                    <div key={index} className="relative">
                      <Image
                        src={index}
                        alt={`Selected Image ${index + 1}`}
                        className="h-40 w-full object-cover rounded-md"
                        height={400}
                        width={400}
                      />
                      <button
                        onClick={() => {
                          deleteSliderImage(index);
                        }}
                        className="absolute top-1 right-1 bg1 h-12 w-12 rounded-full text-white flex items-center justify-center"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
            </div>
          </div>
        </div>

        <button className="button_bg">
          {loadings1 ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default AdminProductPut;
