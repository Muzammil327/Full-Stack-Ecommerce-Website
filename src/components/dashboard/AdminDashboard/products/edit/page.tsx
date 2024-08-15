"use client";
import ProductLongDes from "./ProductLdes";
import {
  ProductDiscountPrice,
  ProductName,
  ProductPrice,
  ProductShortDes,
  ProductStatus,
} from "./ProductRemainingForm";
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
import Image from "next/image";
import { categories } from "@/src/components/data";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ProductTags from "./ProductTags";
import {
  ProductCategory,
  ProductItems,
  ProductSubCategory,
} from "./ProductCat";
import { ProductColor } from "./ProductColor";
import { ProductSize } from "./ProductSize";
import { RelatedProduct } from "./RelatedProduct";

interface Product {
  value: string;
  label: string;
}

const AdminProductPut = () => {
  const { put } = useParams();

  const [loadings1, setLoading1] = useState<boolean>(false);

  const [errors, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // form step 1
  const [name, setName] = useState<string>("");
  const [Sdescription, setSdescription] = useState<string>("");
  const [Ldescription, setLdescription] = useState<string>("");

  const [status, setStatus] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [price, setPrice] = useState<number | undefined>(0);
  const [discountPrice, setDiscountPrice] = useState<number | undefined>(0);

  const [storeImage, setStoreImage] = useState<File | null>(null);

  const [isCheckedFreeDelivery, setIsCheckedFreeDelivery] = useState(false);
  const [isBestPriceCheckbox, setIsBestPriceCheckbox] = useState(false);
  const [isFeatureCheckbox, setIsFeatureCheckbox] = useState(false);
  const [isTopCheckbox, setIsTopCheckbox] = useState(false);

  const [category, setCategory] = useState<Product[]>([]);
  const [subCategory, setSubCategory] = useState<Product[]>([]);
  const [productId, setProductId] = useState<Product[]>([]);

  const [items, setItems] = useState<string[]>([]);
  const [colors, setColors] = useState<Product[]>([]);
  const [size, setSize] = useState<Product[]>([]);

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [slider, setSlider] = useState<File[]>([]);

  const handleImageSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSlider(filesArray);
    }
  };

  const fetchData1 = useCallback(async () => {
    try {
      const response = await axios.get(`${PRODUCT_GET_BY_ID}/${put}`);
      setName(response.data.name);
      setSdescription(response.data.Sdescription);
      setLdescription(response.data.Ldescription);
      setStatus(response.data.status);
      setPrice(response.data.price);
      setDiscountPrice(response.data.dPrice);
      setIsCheckedFreeDelivery(response.data.freeDelivery);
      setIsBestPriceCheckbox(response.data.bestPrice);
      setIsFeatureCheckbox(response.data.feature);
      setIsTopCheckbox(response.data.top);

      if (response.data.categories) {
        const initialCategories = response.data.categories.map((cat: any) => ({
          value: cat._id,
          label: cat.name,
        }));
        setCategory(initialCategories);
      }
      if (response.data.subcategories) {
        const initialCategories = response.data.subcategories.map(
          (cat: any) => ({
            value: cat._id,
            label: cat.name,
          })
        );
        setSubCategory(initialCategories);
      }
      if (response.data.items) {
        const initialCategories = response.data.items.map((cat: any) => ({
          value: cat._id,
          label: cat.name,
        }));
        setItems(initialCategories);
      }
      if (response.data.sizes) {
        const initialCategories = response.data.sizes.map((cat: any) => ({
          value: cat._id,
          label: cat.name,
        }));
        setSize(initialCategories);
      }
      if (response.data.colors) {
        const initialCategories = response.data.colors.map((cat: any) => ({
          value: cat._id,
          label: cat.name,
        }));
        setColors(initialCategories);
      }
      setStoreImage(response.data.image);
      setImageUrls(response.data.slider);
      if (response.data.products) {
        const productArray = response.data.products.map((item: any) => ({
          value: item._id,
          label: item.name,
        }));
        setProductId(productArray);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }, [put]);
  // Call fetchData function to fetch user data

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading1(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("Sdescription", Sdescription);
      formData.append("Ldescription", Ldescription);
      formData.append("status", status);

      formData.append("freeDelivery", isCheckedFreeDelivery ? "true" : "false");
      formData.append("bestPrice", isBestPriceCheckbox ? "true" : "false");
      formData.append("feature", isFeatureCheckbox ? "true" : "false");
      formData.append("top", isTopCheckbox ? "true" : "false");

      if (image) {
        formData.append("image", image);
      }
      slider.forEach((file) => {
        formData.append("slider", file);
      });
      if (price !== undefined) {
        formData.append("price", price.toString());
      }
      if (discountPrice !== undefined) {
        formData.append("discountprice", discountPrice.toString());
      }
      if (colors.length > 0) {
        colors.forEach((colors) => {
          formData.append("colors", colors.value);
        });
      }

      if (size.length > 0) {
        size.forEach((size) => {
          formData.append("size", size.value);
        });
      }
      if (productId.length > 0) {
        productId.forEach((product: any) => {
          formData.append("productId", product.value);
        });
      }
      if (category.length > 0) {
        category.forEach((category: any) => {
          formData.append("category", category.value);
        });
      }
      if (subCategory.length > 0) {
        subCategory.forEach((subCategory: any) => {
          formData.append("subCategory", subCategory.value);
        });
      }
      if (items.length > 0) {
        items.forEach((items: any) => {
          formData.append("items", items.value);
        });
      }
      await axios.put(`${PRODUCT_PUT}/${put}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage("Product udated Successfully!");
      setName("");
      setSdescription("");
      setLdescription("");
      setSubCategory([]);
      setCategory([]);
      setDiscountPrice(0);
      setPrice(0);
      setProductId([]);
      setImage(null);
      setImageUrl(null);
      setIsCheckedFreeDelivery(false);
      setIsBestPriceCheckbox(false);
      setIsFeatureCheckbox(false);
      setIsTopCheckbox(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading1(false);
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

  const deleteImage = async (publicId: any) => {
    try {

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

  // useEffect to fetch slider images when component mounts or productId changes
  useEffect(() => {
    fetchData1();
  }, [fetchData1]); // useEffect depends on fetchSliderImages function

  const deleteSliderImage = async (publicId: any) => {
    console.log(publicId);
    try {
      await axios.delete(
        `${PRODUCT_DELETE_SLIDER_IMAGE}?publicId=${publicId}&&id=${put}`
      );
      fetchData1();
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
        <ProductName setName={setName} name={name} />

        {/* -------- Product Image & Short Description --------  */}

        <div className="grid md:grid-cols-2 gap-4">
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
                  <Image
                    src={`https://res.cloudinary.com/desggllml/image/upload/w_304,h_304,c_fill,e_improve,e_sharpen/${storeImage}`}
                    alt=""
                    height={500}
                    width={500}
                  />
                  <input
                    className="absolute top-1 right-1 bg-red-500 h-12 w-12 rounded-full text-white flex items-center justify-center p-4 cursor-pointer"
                    onClick={() => {
                      deleteImage(storeImage);
                    }}
                    value="X"
                  />
                </div>
              ) : (
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
              )}
            </div>
          </div>
          <ProductShortDes
            Sdescription={Sdescription}
            setSdescription={setSdescription}
          />
        </div>

        {/* -------- Product Long Description --------  */}
        <ProductLongDes
          Ldescription={Ldescription}
          setLdescription={setLdescription}
        />

        {/* -------- Product Price & discount price & status -----------------------  */}

        <div className="grid md:grid-cols-3 gap-4">
          <ProductPrice pPrice={price} setPPrice={setPrice} />
          <ProductDiscountPrice
            discountPrice={discountPrice}
            setDiscountPrice={setDiscountPrice}
          />
          <ProductStatus status={status} setStatus={setStatus} />
        </div>

        {/* -------- Product tags --------  */}
        <ProductTags
          isCheckedFreeDelivery={isCheckedFreeDelivery}
          setIsCheckedFreeDelivery={setIsCheckedFreeDelivery}
          isBestPriceCheckbox={isBestPriceCheckbox}
          setIsBestPriceCheckbox={setIsBestPriceCheckbox}
          isFeatureCheckbox={isFeatureCheckbox}
          setIsFeatureCheckbox={setIsFeatureCheckbox}
          isTopCheckbox={isTopCheckbox}
          setIsTopCheckbox={setIsTopCheckbox}
        />
        {/* -------- Product Catgeory & subCatgeory & Items --------  */}
        <div className="grid grid-cols-3 gap-4">
          <ProductCategory category={category} setCategory={setCategory} />
          <ProductSubCategory
            subCategory={subCategory}
            setSubCategory={setSubCategory}
          />
          <ProductItems item={items} setItems={setItems} />
        </div>

        {/* -------- Product Related & Size & Keywords --------  */}
        <div className="grid grid-cols-3 gap-4">
          <RelatedProduct productId={productId} setProductId={setProductId} />
          <ProductColor colors={colors} setColors={setColors} />
          <ProductSize size={size} setSize={setSize} />
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
              {imageUrls.length > 0 ? (
                <div className="grid grid-cols-3 gap-6">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={`https://res.cloudinary.com/desggllml/image/upload/w_304,h_304,c_fill,e_improve,e_sharpen/${url}`}
                        alt={`Selected Image ${index + 1}`}
                        className="h-40 w-full object-cover rounded-md"
                        height={400}
                        width={400}
                      />
                      <input
                        className="absolute top-1 right-1 bg-red-500 h-12 w-12 rounded-full text-white flex items-center justify-center p-4 cursor-pointer"
                        onClick={() => {
                          deleteSliderImage(url);
                        }}
                        value="X"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">
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

        <button className="button_outline w-full py-4 rounded-md" type="submit">
        {loadings1 ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default AdminProductPut;
