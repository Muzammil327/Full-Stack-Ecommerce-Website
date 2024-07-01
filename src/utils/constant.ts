const URL = process.env.NEXT_PUBLIC_BACKENDAPI;

// ------------------ Product API ------------------
export const PRODUCT_POST = `${URL}/api/v1/product/post`;
export const PRODUCT_PUT = `${URL}/api/v1/product/put`;
export const PRODUCT_DELETE = `${URL}/api/v1/product/delete`;
export const PRODUCT_DELETE_IMAGE = `${URL}/api/v1/product/deleteImage`;
export const PRODUCT_DELETE_SLIDER_IMAGE = `${URL}/api/v1/product/deleteSliderImage`;
export const PRODUCT_GET_BY_ID = `${URL}/api/v1/product/getid`;
