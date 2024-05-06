import { ProductCardProps } from "./product";
import { User } from "./user";

export interface OrderItem {
  userId: User;
  products: ProductCardProps;
  totalPrice: number;
  quantity: number;
  createdAt: Date;
}
