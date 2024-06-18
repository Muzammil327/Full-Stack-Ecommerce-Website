export interface User {
  _id: string;
  email: string;
  password: string;
  username?: string;
  role: string;
  country?: string;
  city?: string;
  zipCode?: string;
  address?: string;
  phone?: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}