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

// -----------------------  Product Card -------------------------------------------

export interface ProductCardType {
  _id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  dPrice: number;
  cat: [name: string];
  subcategory?: string;
}

export interface PaginationType {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  limit: number;
}

export interface ProductCardDataType {
  products: ProductCardType[];
  pagination: PaginationType;
}

// -----------------------  Order -------------------------------------------

export interface OrderItem {
  _id: string;
  qty: number;
  size: string;

  product_Detail: {
    _id: string;
    name: string;
    image: string;
    price: number;
    discountprice: number;
    deliveryCharge: number;
  };
}

// -----------------------  CART -------------------------------------------

export interface CartItem {
  _id: string;
  qty: number;
  size: string;
  product_Detail: {
    _id: string;
    name: string;
    image: string;
    price: number;
    discountprice: number;
    deliveryCharge: number;
  };
}

// -----------------------  Wishlist -------------------------------------------

export interface WishlistItem {
  _id: string;
  qty: number;
  product_Detail: {
    _id: string;
    name: string;
    image: string;
    slug: string;
    price: number;
    discountprice: number;
    deliveryCharge: number;
  };
}
