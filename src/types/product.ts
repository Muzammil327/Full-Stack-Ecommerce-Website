// ------------------------------------------   product cart props ------------------------------------------
export interface ProductCardProps {
  _id: string;
  name: string;
  slug: string;
  image: string;
  category: string;
  price: number;
}

// ------------------------------------------  product pagination props ------------------------------------------
export interface ProductPaginationProps {
  startResult: number;
  endResult: number;
  totalResults: number;
}

// ------------------------------------------  product shop props ------------------------------------------
export interface ProductShopProps {
  products: ProductCardProps[];
  pagination: ProductPaginationProps;
}

export interface ProductData {
  _id: string;
  name: string;
  description: string;
  slug: string;
  category: string;
  subCategory: string;
  items: string;
  price: number;
  discountprice?: number;
  quantity: number;
  image: string;
  keywords: [];
  slider: [];
  productId: [];
  like: [];
  dislike: [];
  reviews: [];
}