// types.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface Order {
  id: number;
  productIds: number[];
  totalAmount: number;
}

export interface CartItem {
  _id: string;
  qty: number;
  product_Detail: {
    _id: string;
    name: string;
    image: string;
    price: number;
    discountprice: number;
    deliveryCharge: number;
  };
}
