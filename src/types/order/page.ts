// Product type
export interface Product {
  name: string;
  slug: string;
  price: number;
  image: string;
}

// User type
export interface User {
  username: string;
  additionalInfo: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  phone1: string;
  phone2: string;
  postalCode: string;
}

// Order type
export interface AdminOrder {
  _id: string;
  totalPrice: number;
  size: string; // Empty string indicates that size is optional
  status: "Delivered" | "Pending" | "Shipped" | "Confirmed" | "Cancelled"; // Define possible status values
  createdAt: string; // ISO date string
  product: Product;
  user: User;
}
