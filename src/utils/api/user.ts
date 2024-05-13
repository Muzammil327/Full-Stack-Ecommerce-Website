import axios, { AxiosError } from "axios";
import { USER_API_Endpoint } from "../constant";

const URL = USER_API_Endpoint;

// `/api/v1/user/get/admin_stats`  // Show stats on dashboard (GET_USER_ADMIN_STATS)
// `/api/v1/user/get`  // Get User with pagination (GET_USERS)
// `/api/v1/user/get/:id`  // Single User (GET_SINGLE_USER)

// `/api/v1/user/delete`  // Delete User (DELETE)

// `/api/v1/user/update`  // Delete User (UPDATE_USER)
// `/api/v1/user/update/addres`  // Update Useraddress (UPDATE_USER_ADDRESS)

export async function GET_USER_ADMIN_STATS() {
  try {
    const response = await axios.get(`${URL}/get/admin_stats`);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error(
          "User Stats Response status code",
          axiosError.response.status
        );
        console.error("User Stats Response data", axiosError.response.data);
        console.error(
          "User Stats Response headers",
          axiosError.response.headers
        );
      } else if (axiosError.request) {
        console.error(
          "No request received from User Stats:",
          axiosError.request
        );
      } else {
        console.error(
          "No response received from User Stats:",
          axiosError.message
        );
      }
    } else {
      console.error("User Stats Non-Axios error occurred:", error.message);
    }
    throw new Error("Failed to fetch User Stats");
  }
}

export async function GET_SINGLE_USER(id: String) {
  try {
    const response = await axios.get(`${URL}/get/${id}`);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error(
          "Single User Getting Response status code",
          axiosError.response.status
        );
        console.error(
          "Single User Getting Response data",
          axiosError.response.data
        );
        console.error(
          "Single User Getting Response headers",
          axiosError.response.headers
        );
      } else if (axiosError.request) {
        console.error(
          "No request received from Single User Getting:",
          axiosError.request
        );
      } else {
        console.error(
          "No response received from Single User Getting:",
          axiosError.message
        );
      }
    } else {
      console.error(
        "Single User Getting Non-Axios error occurred:",
        error.message
      );
    }
    throw new Error("Failed to fetch Single User");
  }
}

export async function UPDATE_USER_ADDRESS(id: String, data: any) {
  try {
    const response = await axios.put(`${URL}/update/address/${id}`, data);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error(
          "Update User Address Response status code",
          axiosError.response.status
        );
        console.error(
          "Update User Address Response data",
          axiosError.response.data
        );
        console.error(
          "Update User Address Response headers",
          axiosError.response.headers
        );
      } else if (axiosError.request) {
        console.error(
          "No request received from Update User Address:",
          axiosError.request
        );
      } else {
        console.error(
          "No response received from Update User Address:",
          axiosError.message
        );
      }
    } else {
      console.error(
        "Update User Address Non-Axios error occurred:",
        error.message
      );
    }
    throw new Error("Failed to Update User Address");
  }
}
