"use client";
import { useAuth } from "@/src/components/context/authContext";
import { useCart } from "@/src/components/context/cartContext/page";
import { useUser } from "@/src/components/context/userContext";
import LoadingTableRow from "@/src/components/element/Loading/LoadingTableRow";
import TableRow from "@/src/components/element/Table/TableRow";
import AdminSidebar from "./AdminSidebar/page";
import Container from "@/src/components/element/container/page";
import AdminUserCard from "./Card/UserCard";
import AdminProductCard from "./Card/AdminProductCard";
import { useFetchArray } from "@/src/components/function/useFetchArray";
import { Cart_API_Endpoint, Favourite_API_Endpoint } from "@/src/utils/constant";
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
            `${Favourite_API_Endpoint}/get_admin`
          );
           setUserWishList(response.data); // Store fetched user data in state
          const response2 = await axios.get(
            `${Cart_API_Endpoint}/get_admin`
          );
          setUserCart(response2.data); // Store fetched user data in state
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchData(); // Call fetchData function to fetch user data
    }
  }, [session]); // useEffect dependency


  return (
    <>
      <AdminSidebar />
      <>
        <div className="grid md:grid-cols-9 grid-cols-1 md:gap-4 gap-2 my-6 md:px-8 px-4 mx-auto">
          <div className="col-span-4">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:mx-4">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <caption className="p-5 text-lg font-semibold rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800 text-center">
                  Admin Profile
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
          <div className="col-span-5">
            <div className="grid grid-cols-2 gap-4">
              <AdminUserCard />
              <AdminProductCard />
              <div className="profileCard flex flex-col border bg-white px-4 py-5 md:mt-0 mt-4 rounded-md transition-all shadow relative">
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
        </div>
      </>
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
