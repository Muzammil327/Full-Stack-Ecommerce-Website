export interface RegisterIprops {
  username: string;
  email: string;
  password: string;
}

export interface LoginIprops {
  email: string;
  password: string;
}

export interface UserIprops {
  email?: string;
  phone: string;
  address: string;
  image: string;
  country: string;
  city: string;
  zipCode: string;
  username: string;
  emailVerified: boolean;
}

export interface AdminStatsIprops {
  cart: number;
  order: number;
  pendingOrder: number;
  product: number;
  user: number;
  wishlist: number;
}

export interface UserStatsIprops {
  cart: number;
  order: number;
  review: number;
  wishlist: number;
}

export interface APIError {
  message: string;
}