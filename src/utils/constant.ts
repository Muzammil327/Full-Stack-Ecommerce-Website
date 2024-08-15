const URL = process.env.NEXT_PUBLIC_BACKENDAPI;

// ------------------ AUTH API ------------------
export const REGISTER_API = `/api/auth/register`;
export const GET_USERDATA_API = `/api/auth/address`;
export const PUT_USERDATA_API = `/api/auth/address`;

// ------------------ USER API ------------------
// ------------------ ADMIN API ------------------
// ------------------ Product API ------------------
export const PRODUCT_POST = `${URL}/api/v1/product/post`;
export const PRODUCT_PUT = `${URL}/api/v1/product/put`;
export const PRODUCT_DELETE = `${URL}/api/v1/product/delete`;
export const PRODUCT_DELETE_IMAGE = `${URL}/api/v1/product/deleteImage`;
export const PRODUCT_DELETE_SLIDER_IMAGE = `${URL}/api/v1/product/deleteSliderImage`;
export const PRODUCT_GET_BY_ID = `${URL}/api/v1/product/getid`;

export const FACEBOOOK_SOCIAL_URL =
  "https://web.facebook.com/smishopmartofficial/ ";
export const INSTRAGRAM_SOCIAL_URL =
  "https://www.instagram.com/smishopmart_official/";
export const WHATSAPP_SOCIAL_URL = "https://wa.me/message/SF5VZYSETIYXN1";
export const LOGO_IMAGE =
  "https://res.cloudinary.com/duif39fso/image/upload/v1723610897/smi-logo_dpm0ub.png";
export const LOGO_TITLE = "SMI Shop Mart";
