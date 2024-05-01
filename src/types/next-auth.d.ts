import "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    email: string;
    username: string;
    role: string;
    country: string;
    city: string;
    zipCode: string;
    address: string;
    phone: string;
    // accessToken: string;
    // refreshToken: string;
    // accessTokenExpires: number;
  }

  interface Session {
    user: User;
    expires: string;
    error: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    email: string;
    username: string;
    role: string;
    country: string;
    city: string;
    zipCode: string;
    address: string;
    phone: string;
  }
}
