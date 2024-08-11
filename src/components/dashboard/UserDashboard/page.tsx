"use client";
import React, { useEffect, useState } from "react";
import UserSidebar from "@/src/components/dashboard/UserDashboard/components/sidebar";
import ProfileCartCard from "./components/Card/ProfileCartCard";
import ProfileOrderCard from "./components/Card/ProfileOrderCard";
import ProfileWishListCard from "./components/Card/ProfileWishListCard";
import ProfileReviewCard from "./components/Card/ProfileReviewCard";
import axios from "axios";
import Table1 from "../../elements/Table";
import { LoadingTableRow } from "../../ui/Loading";
import { useRouter } from "next/navigation";

interface UserData {
  email?: string;
  phone: string;
  address: string;
  image: string;
  country: string;
  city: string;
  zipCode: string;
  username: string;
  emailVerified: boolean;
}

export default function UserDashboard({ userId }: { userId?: string }) {
  return (
    <main>
      <UserSidebar />
      <div className="grid lg:grid-cols-9 grid-cols-1 md:gap-4 gap-2 my-6 md:px-8 px-4 mx-auto">
        <div className="col-span-4">
          <UserData userId={userId} />
        </div>
        <div className="col-span-5">
          {/* <ProfileImage userImage={data} /> */}
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <ProfileCartCard />
            <ProfileOrderCard userId={userId} />
            <ProfileWishListCard />
            <ProfileReviewCard userId={userId} />
          </div>
        </div>
      </div>
    </main>
  );
}

interface UserDataProps {
  userId: any;
}

export function UserData({ userId }: UserDataProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/auth/address/${userId}`);
        const userDataFromApi = response.data.get_user_address;

        setData(userDataFromApi);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data.");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [router, userId]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:mx-4">
      {isLoading ? (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <caption className="p-5 text-lg font-semibold rtl:text-right text-gray-900 text-center bg-slate-200">
            User Profile
          </caption>
          {[...Array(10)].map((_, index) => (
            <LoadingTableRow key={index} cellCount={2} />
          ))}
        </table>
      ) : (
        <>
          {error && <span className="text-red-500">{error}</span>}
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <caption className="p-5 text-lg font-semibold rtl:text-right text-gray-900 text-center bg-slate-200">
              User Profile
            </caption>
            <Table1 userProfile={data} />
          </table>
        </>
      )}
    </div>
  );
}
