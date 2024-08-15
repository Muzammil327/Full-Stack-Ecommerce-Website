"use client";
import { PRODUCT_POST } from "@/src/utils/constant";
import React, { FormEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ProductImage from "./ProductImage";
import ProductLongDes from "./ProductLdes";
import {
  ProductDiscountPrice,
  ProductName,
  ProductPrice,
  ProductShortDes,
  ProductStatus,
} from "./ProductRemainingForm";
import {
  ProductCategory,
  ProductItems,
  ProductSubCategory,
} from "./ProductCat";
import ProductTags from "./ProductTags";
import ProductSliderImage from "./ProductImageSlider";
import { RelatedProduct } from "./RelatedProduct";
import { ProductColor } from "./ProductColor";
import { ProductSize } from "./ProductSize";

interface Product {
  value: string;
  label: string;
}

const AdminProductAddView = () => {
  const [loadings, setLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [Sdescription, setSdescription] = useState<string>("");
  const [Ldescription, setLdescription] = useState<string>("");

  const [isCheckedFreeDelivery, setIsCheckedFreeDelivery] = useState(false);
  const [isBestPriceCheckbox, setIsBestPriceCheckbox] = useState(false);
  const [isFeatureCheckbox, setIsFeatureCheckbox] = useState(false);
  const [isTopCheckbox, setIsTopCheckbox] = useState(false);

  const [status, setStatus] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>(0);
  const [discountPrice, setDiscountPrice] = useState<number | undefined>(0);

  const [category, setCategory] = useState<Product[]>([]);
  const [subCategory, setSubCategory] = useState<Product[]>([]);
  const [productId, setProductId] = useState<Product[]>([]);

  const [items, setItems] = useState<string[]>([]);
  const [colors, setColors] = useState<Product[]>([]);
  const [size, setSize] = useState<Product[]>([]);

  // ---------------------- Handle Single Image ----------------------
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // ---------------------- Handle Slider Image ----------------------
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [slider, setSlider] = useState<File[]>([]);

  // ---------------------- Handle Product POST DATA ----------------------
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("Ldescription", Ldescription);
      formData.append("Sdescription", Sdescription);
      formData.append("status", status);

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

      slider.forEach((file) => {
        formData.append("slider", file);
      });

      if (price !== undefined) {
        formData.append("price", price.toString()); // Convert price to string
      }

      if (discountPrice !== undefined) {
        formData.append("discountPrice", discountPrice.toString()); // Convert price to string
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
        setImage(null);
        setSlider([]);
        setImageUrl(null);
        setImageUrls([]);

        setIsCheckedFreeDelivery(false);
        setIsBestPriceCheckbox(false);
        setIsFeatureCheckbox(false);
        setIsTopCheckbox(false);

        setPrice(undefined);
        setDiscountPrice(undefined);
        setStatus("");

        setSubCategory([]);
        setCategory([]);
        setItems([]);
        setSize([]);

        setProductId([]);
        setColors([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.warning("Some Field Empty");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto px-12 my-10">
      {/* -------- Product Name --------  */}
      <ProductName setName={setName} name={name} />

      {/* -------- Product Image & Short Description --------  */}
      <div className="grid md:grid-cols-2 gap-4">
        <ProductImage
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          setImage={setImage}
        />
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

      {/* -------- Product image slider --------  */}
      <ProductSliderImage
        imageUrls={imageUrls}
        setImageUrls={setImageUrls}
        slider={slider}
        setSlider={setSlider}
      />
      <button className="button_outline w-full py-4 rounded-md" type="submit">
        {loadings ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default AdminProductAddView;
