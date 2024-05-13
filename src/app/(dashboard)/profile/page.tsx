"use client";
import { useEffect, useState } from "react";
import Table from "../components/table";
import { ADDRESS_API_Endpoint } from "@/src/utils/constant";
import axios from "axios";
import { useAuth } from "@/src/components/contexts/authContext";
import LoadingTableRow from "@/src/components/ui/Loading/LoadingTableRow";
import ProfileCartCard from "./Card/ProfileCartCard";
import ProfileOrderCard from "./Card/ProfileOrderCard";
import ProfileWishListCard from "./Card/ProfileWishListCard";
import ProfilePendingOrderCard from "./Card/ProfilePendingOrderCard";

interface UserData {
  email?: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  zipCode: string;
  username: string;
}

export default function Page() {
  const { user } = useAuth();

  const [data, setData] = useState<UserData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${ADDRESS_API_Endpoint}/get/${user}`);

        setData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data:");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <>
      <div className="grid lg:grid-cols-9 grid-cols-1 md:gap-4 gap-2 my-6 md:px-8 px-4 mx-auto">
        <div className="col-span-4">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:mx-4">
            {isLoading ? (
              <>
                <LoadingTableRow />
                <LoadingTableRow />
                <LoadingTableRow />
                <LoadingTableRow />
                <LoadingTableRow />
                <LoadingTableRow />
              </>
            ) : (
              <>
                {error && <span className="text-red-500">{error}</span>}
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <caption className="p-5 text-lg font-semibold rtl:text-right text-gray-900 text-center bg-slate-200">
                    User Profile
                  </caption>
                  <Table userProfile={data} />
                </table>
              </>
            )}
          </div>
        </div>
        <div className="col-span-5">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <ProfileCartCard />
            <ProfileOrderCard />
            <ProfileWishListCard />
            <ProfilePendingOrderCard />
          </div>
        </div>
      </div>
    </>
  );
}
