
const URL = process.env.NEXT_PUBLIC_BACKENDAPI;

export const Product_API_Endpoint = `${URL}/api/v1/product`
export const Cart_API_Endpoint = `${URL}/api/v1/cart`
export const Favourite_API_Endpoint = `${URL}/api/v1/favourite`
export const PENDINGORDER_API_Endpoint = `${URL}/api/v1/pendingOrder`
export const USER_API_Endpoint = `${URL}/api/v1/user`

export const revalidate = 3600