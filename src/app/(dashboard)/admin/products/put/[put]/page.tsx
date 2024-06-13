"use client";
import Input from "@/src/components/ui/Input";
import Label from "@/src/components/ui/Label";
import { Product_DELETE_IMAGE, Product_GET, Product_GET_BYID, Product_PUT } from "@/src/utils/constant";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import Select, { ActionMeta, OnChangeValue } from "react-select";

interface Option {
  value: string;
  label: string;
}
const Page = () => {
  const { put } = useParams();

  const [loadings1, setLoading1] = useState<boolean>(false);
  const router = useRouter();

  const [errors, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // form step 1
  const [data, setData] = useState([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [items, setItems] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [productId, setProductId] = useState<Option[]>([]);

  // const [productId, setProductId] = useState<Option[]>([]);
  const [price, setPrice] = useState<number | undefined>(0);
  const [discountprice, setDiscountPrice] = useState<number | undefined>(0);
  const [quantity, setQuantity] = useState<number | undefined>(0);
  const [imageDeleted, setImageDeleted] = useState(false);
  const [storeImage, setStoreImage] = useState<File | null>(null);

  const [tags, setTags] = useState<string[]>([]);

  const [isCheckedFreeDelivery, setIsCheckedFreeDelivery] = useState(false);
  const [isBestPriceCheckbox, setIsBestPriceCheckbox] = useState(false);
  const [isFeatureCheckbox, setIsFeatureCheckbox] = useState(false);
  const [isTopCheckbox, setIsTopCheckbox] = useState(false);

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
        const response = await axios.get(`${Product_GET}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData(); // Call fetchData function to fetch user data
  }, []); // useEffect dependency
  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get(
          `${Product_GET_BYID}/${put}`
        );
        setName(response.data.name);
        setDescription(response.data.description);
        setCategory(response.data.category);
        setSubCategory(response.data.subCategory);
        setItems(response.data.items);
        setStatus(response.data.status);
        setStoreImage(response.data.image);
        setIsCheckedFreeDelivery(response.data.freeDelivery);
        setIsBestPriceCheckbox(response.data.bestPrice);
        setIsFeatureCheckbox(response.data.feature);
        setIsTopCheckbox(response.data.top);
        setTags(response.data.keywords);
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
    };
    fetchData1(); // Call fetchData function to fetch user data
  }, [put]); // useEffect dependency

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    if (image) {
      try {
        if (imageDeleted && !image) {
          // If image is deleted and no new image is uploaded, prevent form submission
          console.log(
            "Image deleted without replacement. Form submission prevented."
          );
          return;
        }
        setLoading1(true);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("subCategory", subCategory);
        formData.append("items", items);
        formData.append("status", status);

        if (tags.length > 0) {
          tags.forEach((tags) => {
            formData.append("keywords", tags);
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
        if (quantity !== undefined) {
          formData.append("quantity", quantity.toString()); // Convert price to string
        }
        if (productId.length > 0) {
          productId.forEach((value: any) => {
            formData.append("product", value.value);
          });
        }

        const response = await axios.put(
          `${Product_PUT}/${put}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setSuccessMessage("Product udated Successfully!");
        setName("");
        setDescription("");
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
    }
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
  const deleteImage = async (publicId: File) => {
    try {
      setImageDeleted(true);

      await axios.delete(
        `${Product_DELETE_IMAGE}?publicId=${publicId}`
      );
      setImage(null);
      setImageUrl(null);
      setStoreImage(null);
      router.push(`/admin/products/put/${put}`);
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
                <img src={`${storeImage}`} alt="" />
                <input
                  type="submit"
                  className="absolute top-1 right-1 bg-1 h-10 w-10 flex items-center justify-center"
                  onClick={() => {
                    deleteImage(storeImage);
                  }}
                  value="X"
                />
              </div>
            ) : null}
            <div className="text-center">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Selected Image"
                  className="mx-auto h-40"
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

        <div className="mb-6">
          <Label label="Product Name:" htmlFor="productname" />
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name."
            type="text"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-base font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your product description."
            className="w-full border border-gray-300 py-3 pl-3 rounded-md mt-2 shadow-sm outline-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:transition-all hover:transition-all"
            cols={30}
            rows={10}
          ></textarea>
        </div>

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
              <option value="">Select category</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="children">Children</option>
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
              <option value="clothing">Clothing</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
        </div>

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
              <option value="watches">Watches</option>
              <option value="women">Women</option>
              <option value="children">Children</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="quantity"
              className="block text-base font-medium text-gray-700"
            >
              Quantity In Stock:
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={quantity || ""}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              placeholder="Enter your quantity."
              className="w-full border border-gray-300 py-3 pl-3 rounded-md mt-2 shadow-sm outline-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:transition-all hover:transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
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

          <div className="mb-6">
            <label
              htmlFor="discountprice"
              className="block text-base font-medium text-gray-700"
            >
              Discount Price:
            </label>
            <input
              type="number"
              name="discountprice"
              id="discountprice"
              value={discountprice || ""}
              onChange={(e) => setDiscountPrice(parseInt(e.target.value))}
              placeholder="Enter your discount price."
              className="w-full border border-gray-300 py-3 pl-3 rounded-md mt-2 shadow-sm outline-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:transition-all hover:transition-all"
            />
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

        <div className="mb-6">
          <label
            htmlFor="productId"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Keywords
          </label>
          <TagsInput value={tags} onChange={handleTagsChange} />
        </div>

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

        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loadings1 ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default Page;
