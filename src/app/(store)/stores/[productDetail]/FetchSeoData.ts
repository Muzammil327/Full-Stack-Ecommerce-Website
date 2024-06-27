import axios from "axios";

export async function getProductDetails(params: any) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKENDAPI}/api/product/get/productDetail/${params}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product details", error);
    return null;
  }
}
