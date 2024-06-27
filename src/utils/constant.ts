import axios from "axios";
const URL = process.env.NEXT_PUBLIC_BACKENDAPI;

// ------------------ User API ------------------
export const GET_User = `${URL}/api/user/put/address`;
export const GET_User_Address = `${URL}/api/user/get`;
export const GET_User_Address_Update = `${URL}/api/user/put/address`;
export const ADDRESS_UPDATE_API = `${URL}/api/user/put/shipping`;

// ------------------ Cart API ------------------
export const GET_Cart_User = `${URL}/api/user/put/shipping`;

// ------------------ Order API ------------------
export const GET_Order_User = `${URL}/api/user/put/shipping`;

// ------------------ Wishlist API ------------------
export const GET_Wishlist_User = `${URL}/api/user/put/shipping`;

// ------------------ Pending Order API ------------------
export const GET_PendingOrder_User = `${URL}/api/user/put/shipping`;
export const POST_PendingOrder_User = `${URL}/api/user/put/shipping`;
export const DELETE_PendingOrder_User = `${URL}/api/user/put/shipping`;

// ------------------ Review API ------------------
export const GET_Review_User = `${URL}/api/user/put/shipping`;

