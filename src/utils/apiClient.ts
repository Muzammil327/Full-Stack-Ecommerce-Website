// apiClient.ts
import axios from "axios";
import { Product, Order, CartItem } from "@/src/types/page";
import { QueryFunctionContext } from "react-query";

const apiClient = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchCarts = async (
  context: QueryFunctionContext<[string, string]>
): Promise<CartItem[]> => {
  const [, userId] = context.queryKey;
  const response = await apiClient.get(`/api/cart?userId=${userId}`);
  return response.data.get_user_cart;
};
// export const fetchCarts = async (userId: String): Promise<CartItem[]> => {
//   const response = await apiClient.get(`/api/cart?userId=${userId}`);
//   return response.data.get_user_cart;
// };

export const fetchProduct = async (id: number): Promise<Product> => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

export const createOrder = async (orderData: Order): Promise<Order> => {
  const response = await apiClient.post("/orders", orderData);
  return response.data;
};

export const updateCart = async (cartData: CartItem[]): Promise<CartItem[]> => {
  const response = await apiClient.put("/cart", cartData);
  return response.data;
};

export const deleteCartItem = async (itemId: number): Promise<void> => {
  await apiClient.delete(`/cart/items/${itemId}`);
};
