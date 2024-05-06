import { ProductCardProps } from "./product";
import {User} from './user'

export interface Cart {
  _id: string;
  userId: User;
  productId: ProductCardProps;
  quantity: number;
  createdAt?: Date;
}
export interface CartItems {
  _id: string;
  userId: User;
  productId: ProductCardProps;
  quantity: number;
  createdAt?: Date;
}
