const URL = process.env.NEXT_PUBLIC_BACKENDAPI;
export const Product_URL = "api/v1/product";

export const Product_API_Endpoint = `${URL}/api/v1/product`;

// ------------------ Product API ------------------
export const Product_POST = `${URL}/${Product_URL}/post`;
export const Product_PUT = `${URL}/${Product_URL}/put`;
export const Product_PUT_Slider = `${URL}/${Product_URL}/put/slider`;
export const Product_PUT_LIKE = `${URL}/${Product_URL}/put/like`;
export const Product_PUT_DISLIKE = `${URL}/${Product_URL}/put/dislike`;
export const Product_GET = `${URL}/${Product_URL}/stats`;
export const Product_STORE = `${URL}/${Product_URL}/get`;
export const Product_GET_BYSLUG = `${URL}/${Product_URL}/get`;
export const Product_GET_BYID = `${URL}/${Product_URL}/getid`;
export const Product_DELETE = `${URL}/${Product_URL}/delete`;
export const Product_DELETE_IMAGE = `${URL}/${Product_URL}/deleteImage`;
export const Product_DELETE_SliderIMAGE = `${URL}/${Product_URL}/deleteSliderImage`;


export const Cart_API_Endpoint = `${URL}/api/v1/cart`;
export const Favourite_API_Endpoint = `${URL}/api/v1/wishlist`;
export const PENDINGORDER_API_Endpoint = `${URL}/api/v1/pendingOrder`;
export const ORDER_API_Endpoint = `${URL}/api/v1/order`;
export const USER_API_Endpoint = `${URL}/api/v1/user`;
export const ADDRESS_API_Endpoint = `${URL}/api/v1/address`;

export const revalidate = 3600;
