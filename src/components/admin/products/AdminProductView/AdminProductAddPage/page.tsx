"use client";
import { Category, SubCategory } from "@/src/components/data";
import { PRODUCT_POST } from "@/src/utils/constant";
import React, { FormEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ProductImage from "./ProductImage";
import ProductLongDes from "./ProductLdes";
import {
  ProductDeliveryCharge,
  ProductDiscountPrice,
  ProductName,
  ProductPlatform,
  ProductProfit,
  ProductPSlug,
  ProductPurchasePrice,
  ProductQuantity,
  ProductShortDes,
  ProductStatus,
} from "./ProductRemainingForm";
import {
  ProductCategory,
  ProductItems,
  ProductSubCategory,
} from "./ProductCat";
import Form from "@/src/components/ui/form/form";
import ProductTags from "./ProductTags";
import ProductSliderImage from "./ProductImageSlider";
import { RelatedProduct } from "./RelatedProduct";
import { ProductColor } from "./ProductColor";
import { ProductSize } from "./ProductSize";

interface Product {
  value: string;
  label: string;
}

const ProductAddPage = () => {
  const [loadings, setLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [pSlug, setPSlug] = useState<string>("");
  const [Sdescription, setSdescription] = useState<string>("");
  const [Ldescription, setLdescription] = useState<string>("");

  const [isCheckedFreeDelivery, setIsCheckedFreeDelivery] = useState(false);
  const [isBestPriceCheckbox, setIsBestPriceCheckbox] = useState(false);
  const [isFeatureCheckbox, setIsFeatureCheckbox] = useState(false);
  const [isTopCheckbox, setIsTopCheckbox] = useState(false);

  const [quantity, setQuantity] = useState<number | undefined>(0);

  const [platform, setPlatform] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [pPrice, setPPrice] = useState<number | undefined>(0);
  const [deliveryCharge, setDeliveryCharge] = useState<number | undefined>(0);
  const [profit, setProfit] = useState<number | undefined>(0);
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
      formData.append("pSlug", pSlug);
      formData.append("Ldescription", Ldescription);
      formData.append("Sdescription", Sdescription);
      formData.append("status", status);
      formData.append("platform", platform);

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

      if (pPrice !== undefined) {
        formData.append("pPrice", pPrice.toString()); // Convert price to string
      }

      if (deliveryCharge !== undefined) {
        formData.append("deliveryCharge", deliveryCharge.toString()); // Convert price to string
      }

      if (profit !== undefined) {
        formData.append("profit", profit.toString()); // Convert price to string
      }

      if (discountPrice !== undefined) {
        formData.append("discountPrice", discountPrice.toString()); // Convert price to string
      }

      if (quantity !== undefined) {
        formData.append("quantity", quantity.toString()); // Convert price to string
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
          formData.append("productId", JSON.stringify(product));
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

        setPPrice(undefined);
        setDeliveryCharge(undefined);
        setProfit(undefined);
        setDiscountPrice(undefined);
        setPlatform("");
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

  function calculateRoundedDiscountedPrice(
    originalPrice: number,
    discountPercentage: number
  ) {
    // Calculate the discount amount
    const discountAmount = originalPrice * (discountPercentage / 100);

    // Calculate the discounted price
    const discountedPrice = originalPrice - discountAmount;

    // Round the discounted price to the nearest multiple of 10
    const roundedDiscountedPrice = Math.round(discountedPrice / 10) * 10;

    return roundedDiscountedPrice;
  }
  const Final_Price = (pPrice || 0) + (deliveryCharge || 0) + (profit || 0);

  const Final_Discount_Price = calculateRoundedDiscountedPrice(
    Final_Price,
    discountPrice as number
  );
  return (
    <Form SubmitHandle={handleSubmit} className="container mx-auto px-12 my-10">
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

      {/* -------- Product Purchase Price & discount price & before login price -----------------------  */}
      <div className="grid md:grid-cols-3 gap-4">
        <ProductPlatform
          platform={platform}
          setPlatform={setPlatform}
          setDeliveryCharge={setDeliveryCharge}
        />
        <ProductPurchasePrice pPrice={pPrice} setPPrice={setPPrice} />
        <ProductDeliveryCharge
          deliveryCharge={deliveryCharge}
          setDeliveryCharge={setDeliveryCharge}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <span>Final Price: {Final_Price}</span>
        <span>Discount Final Price: {Final_Discount_Price}</span>
      </div>

      {/* -------- Product Price & discount price & before login price -----------------------  */}

      <div className="grid md:grid-cols-3 gap-4">
        <ProductProfit profit={profit} setProfit={setProfit} />
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

      {/* -------- Product Quantity & product slug --------  */}
      <div className="grid grid-cols-2 gap-4">
        <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
        <ProductPSlug pSlug={pSlug} setPSlug={setPSlug} />
      </div>

      {/* -------- Product image slider --------  */}
      <ProductSliderImage
        imageUrls={imageUrls}
        setImageUrls={setImageUrls}
        slider={slider}
        setSlider={setSlider}
      />
      <button className="button_outline w-full py-4 rounded-md">
        {loadings ? "Submitting..." : "Submit"}
      </button>
    </Form>
  );
};

export default ProductAddPage;
