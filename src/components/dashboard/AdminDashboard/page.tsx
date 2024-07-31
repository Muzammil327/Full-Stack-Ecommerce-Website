"use client";
import React, { useEffect, useState } from "react";
import AdminCartCard from "./components/Card/AdminCartCard";
import AdminWishListCard from "./components/Card/AdminWishListCard";
import AdminOrderCard from "./components/Card/AdminOrderCard";
import AdminPendingOrderCard from "./components/Card/AdminPendingOrderCard";
import AdminProductCard from "./components/Card/AdminProductCard";
import AdminUserCard from "./components/Card/AdminUserCard";
import axios from "axios";
import Table from "../../elements/Table";
import AdminSidebar from "./components/sidebar";
import Link from "next/link";
import { LoadingTableRow } from "../../ui/Loading";

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

export default function UserDashboard({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<UserData | null>(null);
  const [stats, setStats] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/auth/address/${userId}`);
        const stats = await axios.get(`/api/auth/admin`);
        setStats(stats.data);
        const userDataFromApi = response.data.get_user_address[0];
        setData(userDataFromApi);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data:");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  return (
    <main>
      <AdminSidebar />
      <div className="grid lg:grid-cols-9 grid-cols-1 md:gap-4 gap-2 my-6 md:px-8 px-4 mx-auto">
        <div className="col-span-4">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:mx-4">
            {isLoading ? (
              <>
                <LoadingTableRow cellCount={3} />
                <LoadingTableRow cellCount={3} />
                <LoadingTableRow cellCount={3} />
                <LoadingTableRow cellCount={3} />
                <LoadingTableRow cellCount={3} />
                <LoadingTableRow cellCount={3} />
                <LoadingTableRow cellCount={3} />
                <LoadingTableRow cellCount={3} />
                <LoadingTableRow cellCount={3} />
                <LoadingTableRow cellCount={3} />
                <LoadingTableRow cellCount={3} />
              </>
            ) : (
              <>
                {error && <span className="text-red-500">{error}</span>}
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <caption className="p-5 text-lg font-semibold rtl:text-right text-gray-900 text-center bg-slate-200">
                    Admin Profile
                  </caption>
                  <Table userProfile={data} />
                </table>
              </>
            )}
          </div>
        </div>
        <div className="col-span-5">
          {/* <ProfileImage userImage={data} /> */}
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <AdminCartCard stats={stats} isLoading={isLoading} error={error} />
            <AdminWishListCard
              stats={stats}
              isLoading={isLoading}
              error={error}
            />
            <Link href="/dashboard/admin/orders">
              <AdminOrderCard
                stats={stats}
                isLoading={isLoading}
                error={error}
              />
            </Link>
            <AdminPendingOrderCard
              stats={stats}
              isLoading={isLoading}
              error={error}
            />
            <Link href="/dashboard/admin/products">
              <AdminProductCard
                stats={stats}
                isLoading={isLoading}
                error={error}
              />
            </Link>
            <AdminUserCard stats={stats} isLoading={isLoading} error={error} />
          </div>
        </div>
      </div>
    </main>
  );
}
