import { Product_API_Endpoint } from "@/src/utils/constant";
import axios from "axios";

export async function getProductDetails(params: any) {
  try {
    const response = await axios.get(`${Product_API_Endpoint}/get/${params}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product details", error);
    return null;
  }
}
