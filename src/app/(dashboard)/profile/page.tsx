"use client";
import { useAuth } from "@/src/components/context/authContext";
import { useCart } from "@/src/components/context/cartContext/page";
import { useUser } from "@/src/components/context/userContext";
import LoadingTableRow from "@/src/components/element/Loading/LoadingTableRow";
import TableRow from "@/src/components/element/Table/TableRow";
import UserSidebar from "./UserSidebar/page";
import Container from "@/src/components/element/container/page";
import {
  Cart_API_Endpoint,
  Favourite_API_Endpoint,
} from "@/src/utils/constant";
import { useFetchArray } from "@/src/components/function/useFetchArray";
import { useEffect, useState } from "react";
import axios from "axios";

interface UserData {
  email: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  zipCode: string;
  username: string;
}

export default function Page() {
  const { userProfile, isLoading, error } = useUser();
  const { session } = useAuth();

  const [userCart, setUserCart] = useState([]);
  const [userWishList, setUserWishList] = useState([]);
  useEffect(() => {
    // Ensure session exists and has user information
    if (session && session.user && session.user._id) {
      // Fetch user data when session and user ID are available
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${Cart_API_Endpoint}/get_user/${session.user._id}`
          );
          setUserCart(response.data); // Store fetched user data in state
          const response2 = await axios.get(
            `${Favourite_API_Endpoint}/get_user/${session.user._id}`
          );
          setUserWishList(response2.data); // Store fetched user data in state
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchData(); // Call fetchData function to fetch user data
    }
  }, [session]); // useEffect dependency

  return (
    <>
      <UserSidebar />
      <Container>
        <div className="profile grid md:grid-cols-9 md:gap-4 my-6">
          <div className="col-span-4">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:mx-4">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <caption className="p-5 text-lg font-semibold rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800 text-center">
                  User Profile
                </caption>
                {error && <span>{error}</span>}

                {isLoading ? (
                  <>
                    <LoadingTableRow />
                    <LoadingTableRow />
                    <LoadingTableRow />
                    <LoadingTableRow />
                    <LoadingTableRow />
                  </>
                ) : (
                  <>
                    {userProfile ? (
                      <UserDataTable userProfile={userProfile} />
                    ) : (
                      <span>No user profile available</span>
                    )}
                  </>
                )}
              </table>
            </div>
          </div>
          <div className="col-span-5 grid sm:grid-cols-2 gap-4">
            <div className="profileCard h-32 border bg-white px-4 py-5 md:mt-0 mt-4 rounded-md transition-all shadow relative">
              <div className="icon shadow-sm h-12 flex items-center justify-center w-12 border rounded-full">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 1024 1024"
                  fill="#000000"
                  className="icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M53.6 1023.2c-6.4 0-12.8-2.4-17.6-8-4.8-4.8-7.2-11.2-6.4-18.4L80 222.4c0.8-12.8 11.2-22.4 24-22.4h211.2v-3.2c0-52.8 20.8-101.6 57.6-139.2C410.4 21.6 459.2 0.8 512 0.8c108 0 196.8 88 196.8 196.8 0 0.8-0.8 1.6-0.8 2.4v0.8H920c12.8 0 23.2 9.6 24 22.4l49.6 768.8c0.8 2.4 0.8 4 0.8 6.4-0.8 13.6-11.2 24.8-24.8 24.8H53.6z m25.6-48H944l-46.4-726.4H708v57.6h0.8c12.8 8.8 20 21.6 20 36 0 24.8-20 44.8-44.8 44.8s-44.8-20-44.8-44.8c0-14.4 7.2-27.2 20-36h0.8v-57.6H363.2v57.6h0.8c12.8 8.8 20 21.6 20 36 0 24.8-20 44.8-44.8 44.8-24.8 0-44.8-20-44.8-44.8 0-14.4 7.2-27.2 20-36h0.8v-57.6H125.6l-46.4 726.4zM512 49.6c-81.6 0-148.8 66.4-148.8 148.8v3.2h298.4l-0.8-1.6v-1.6c0-82.4-67.2-148.8-148.8-148.8z"
                    fill=""
                  />
                </svg>
              </div>
              <h4 className="py-2 text-lg font-medium">Total Cart</h4>
              <span className="absolute top-2 text-4xl right-6 text-gray-200 transition-all">
                {userCart.length}
              </span>
            </div>
            <div className="profileCard h-32 border bg-white px-4 py-5 md:mt-0 mt-4 rounded-md transition-all shadow relative">
              <div className="icon shadow-sm h-12 flex items-center justify-center w-12 border rounded-full">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke-width="3"
                  stroke="#000000"
                  fill="none"
                >
                  <path d="M9.06,25C7.68,17.3,12.78,10.63,20.73,10c7-.55,10.47,7.93,11.17,9.55a.13.13,0,0,0,.25,0c3.25-8.91,9.17-9.29,11.25-9.5C49,9.45,56.51,13.78,55,23.87c-2.16,14-23.12,29.81-23.12,29.81S11.79,40.05,9.06,25Z" />
                </svg>
              </div>
              <h4 className="py-2 text-lg font-medium">Total Wishlist</h4>
              <span className="absolute top-2 text-4xl right-6 text-gray-200 transition-all">
                {userWishList.length}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

function UserDataTable({ userProfile }: { userProfile: UserData }) {
  return (
    <tbody>
      <TableRow label="User Name" value={userProfile.username} />
      <TableRow label="Email" value={userProfile.email} />
      <TableRow label="Phone Number" value={userProfile.phone} />
      <TableRow label="Address" value={userProfile.address} />
      <TableRow label="Country" value={userProfile.country} />
      <TableRow label="City" value={userProfile.city} />
      <TableRow label="Postal/Zip Code" value={userProfile.zipCode} />
    </tbody>
  );
}
