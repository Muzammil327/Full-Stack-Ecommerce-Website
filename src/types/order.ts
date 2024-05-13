import { ProductData } from "./product";

export interface Order {
  _id: string;
  status: string;
  totalPrice: number;
  qty: number;
  product: ProductData;
}
