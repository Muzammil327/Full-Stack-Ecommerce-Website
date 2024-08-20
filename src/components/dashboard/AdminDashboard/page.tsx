"use client";
import React, { Suspense } from "react";
import Link from "next/link";
import AdminSidebar from "@/src/components/dashboard/AdminDashboard/AdminSidebar";
import { LoadingTableRow } from "@/src/components/ui/Loading/LoadingTableRow";
import Table1 from "@/src/components/ui/Table/Table1";
import StatCard from "@/src/components/ui/card/StatCard";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";
import GETUserAction from "@/src/action/auth/GETUserAction";
import GETAdminStatsAction from "@/src/action/admin/GETAdminStatsAction";
import { Links } from "../../ui/Typography";

export default function UserDashboard({ userId }: { userId: string }) {
  const { data, loading, error } = GETUserAction({ userId });
  const { error1, loading1, adminStats } = GETAdminStatsAction();

  return (
    <main>
      <AdminSidebar />
      <div className="grid lg:grid-cols-9 grid-cols-1 md:gap-4 gap-2 my-6 md:px-8 px-4 mx-auto">
        <div className="col-span-4">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:mx-4">
            {loading ? (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <caption className="p-5 text-lg font-semibold rtl:text-right text-gray-900 text-center bg-slate-200">
                  Admin Profile
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
                    Admin Profile
                  </caption>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Table1 userProfile={data} />
                  </Suspense>
                </table>
              </>
            )}
          </div>
        </div>
        <div className="col-span-5">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            {/* CART START HERE */}
            <Suspense fallback={<div>Loading...</div>}>
              <StatCard
                error={error1}
                length={loading1 ? 0 : adminStats?.cart}
                name="Total Carts"
                svg={<FaCartShopping />}
              />
            </Suspense>
            {/* WISHLIST START HERE */}
            <Suspense fallback={<div>Loading...</div>}>
              <StatCard
                error={error1}
                length={loading1 ? 0 : adminStats?.wishlist}
                name="Total WishLists"
                svg={
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    strokeWidth="3"
                    stroke="#000000"
                    fill="none"
                  >
                    <path d="M9.06,25C7.68,17.3,12.78,10.63,20.73,10c7-.55,10.47,7.93,11.17,9.55a.13.13,0,0,0,.25,0c3.25-8.91,9.17-9.29,11.25-9.5C49,9.45,56.51,13.78,55,23.87c-2.16,14-23.12,29.81-23.12,29.81S11.79,40.05,9.06,25Z" />
                  </svg>
                }
              />
            </Suspense>
            {/* ADMIN ORDER HERE */}
            <Links slug="/dashboard/admin/orders" title="admin order card">
              <Suspense fallback={<div>Loading...</div>}>
                <StatCard
                  error={error1}
                  length={loading1 ? 0 : adminStats?.order}
                  name="Total Orders"
                  svg={
                    <svg
                      fill="#000000"
                      width="25px"
                      height="25px"
                      viewBox="0 0 64 64"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="a" />

                      <g id="b">
                        <path d="M52.8662,34.4341l-.1855-.1553c-.4968-.4137-1.0825-.6448-1.6807-.7107v-10.5681h.5c.8271,0,1.5-.6729,1.5-1.5v-6c0-.8271-.6729-1.5-1.5-1.5h-4.9778c.1049-.0766,.2103-.1512,.3118-.2393,2.1826-1.895,2.1543-3.6997,2.1523-3.7759-.0059-.1895-.1182-.3594-.291-.439-.0703-.0327-1.75-.79-3.915-.4653-1.3951,.2097-2.538,.8584-3.2874,1.6213-.621-1.0389-1.7364-1.7019-2.9929-1.7019h-1c-1.2579,0-2.3728,.6625-2.9934,1.7014-.7495-.7627-1.8922-1.4112-3.2869-1.6208-2.166-.3247-3.8457,.4326-3.915,.4653-.1729,.0796-.2852,.2495-.291,.439-.002,.0762-.0303,1.8809,2.1533,3.7764,.1013,.0879,.2065,.1623,.3111,.2388h-4.9781c-.8271,0-1.5,.6729-1.5,1.5v6c0,.8271,.6729,1.5,1.5,1.5h.5v12.9702h-2.0059c-1.3349,0-2.9818,1.712-3.9941,2.9432v-1.4135c0-1.3784-1.1211-2.5-2.5-2.5h-4c-1.3789,0-2.5,1.1216-2.5,2.5v15c0,1.3784,1.1211,2.5,2.5,2.5h4c1.3789,0,2.5-1.1216,2.5-2.5v-.9935c.862,.3297,1.7813,.5083,2.7002,.5121,1.3291,.0054,3.7402,.0142,6.1436,.0142,1.918,0,3.8311-.0054,5.1836-.022l.6201-.0059c3.8154-.0322,6.8281-.0581,11.9756-4.8564,3.2236-3.0044,5.957-6.1724,7.6826-8.3013,1.0791-1.3325,.8818-3.312-.4395-4.4131Zm-2.8662-.8198c-.5712,.1215-1.115,.3999-1.5615,.8388l-5.6436,5.5469h-.7949V23h8v10.6143Zm-8-18.6143v7h-8v-7h8Zm-7,22.3705v-14.3705h6v17h-5.6928c.0971-.3987,.1225-.838,.1225-1.3779,0-.5096-.1658-.9189-.4297-1.2515ZM51.5,15c.2754,0,.5,.2241,.5,.5v6c0,.2759-.2246,.5-.5,.5h-8.5v-6.998l8.5-.002Zm-6.5713-4.9302c.3262-.0493,.6396-.0693,.9355-.0693,.9238,0,1.6768,.1963,2.083,.3306-.1006,.5054-.4639,1.542-1.7686,2.6743-.8247,.7158-1.8089,.9547-2.6747,.9946h-.5879c-.118-.006-.234-.0137-.3428-.0249h-.001c-.5664-.0581-1.0146-.521-1.0205-1.0488v-.3623c0-.791,1.3467-2.1895,3.377-2.4941Zm-7.4287-.0698h1c1.0427,0,1.9507,.6369,2.323,1.5952-.1702,.3301-.2712,.6605-.2712,.9688v.3677c.0043,.3904,.1217,.7563,.322,1.0684h-5.7481c.2007-.313,.3183-.6807,.3226-1.0737v-.3623c0-.3082-.1011-.6385-.2711-.9686,.3714-.959,1.2789-1.5954,2.3229-1.5954Zm-7.6777,3.0059c-1.3076-1.1348-1.6699-2.1719-1.7705-2.6743,.5371-.1782,1.6748-.4648,3.0195-.2617,2.0303,.3047,3.377,1.7031,3.377,2.4941v.3569c-.0059,.5332-.4541,.9961-1.0205,1.0542h-.001c-.1087,.0112-.2247,.0189-.3426,.0249h-.5879c-.8657-.0399-1.85-.2788-2.674-.9941Zm-5.8223,8.4941v-6c0-.2759,.2246-.5,.5-.5l8.5,.002v6.998h-8.5c-.2754,0-.5-.2241-.5-.5Zm2,1.5h8v13.6061c-1.2733-.6221-2.9523-.6359-3.0654-.6359h-4.9346v-12.9702Zm-8,29.5c0,.8271-.6729,1.5-1.5,1.5h-4c-.8271,0-1.5-.6729-1.5-1.5v-15c0-.8271,.6729-1.5,1.5-1.5h4c.8271,0,1.5,.6729,1.5,1.5v15Zm34.5283-14.2827c-1.7051,2.104-4.4062,5.2344-7.5869,8.1997-4.8633,4.5332-7.7051,4.5571-11.3018,4.5879l-.624,.0059c-3.041,.0381-8.9238,.0171-11.3115,.0078-.9418-.0035-1.848-.212-2.7041-.5998v-9.8643c1.0238-1.4363,2.9326-3.5843,3.9941-3.5843h7.9404c.0352,0,3.4951,.0449,3.4951,1.6519,0,1.8667,0,2.062-6.0947,5.6089-.2383,.1387-.3193,.4448-.1807,.6836,.0938,.1597,.2607,.2485,.4326,.2485,.0859,0,.1729-.022,.252-.0679,3.6129-2.1029,5.2478-3.1179,5.9881-4.0952h8.173c.1309,0,.2568-.0513,.3506-.1436l5.7891-5.6904c.7969-.7808,2.042-.8325,2.9004-.1191l.1855,.1553c.9043,.7529,1.04,2.106,.3027,3.0151Z" />
                      </g>
                    </svg>
                  }
                />
              </Suspense>
            </Links>
            {/* ADMIN PENDING ORDER */}
            <Suspense fallback={<div>Loading...</div>}>
              <StatCard
                error={error1}
                length={loading1 ? 0 : adminStats?.pendingOrder}
                name="Total Pending Orders"
                svg={
                  <svg
                    width="25px"
                    height="25px"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="grid_system" />

                    <g id="_icons">
                      <path d="M17,2c-1.3,0-2.4,0.5-3.3,1.2c0,0-0.1,0-0.1-0.1C11.9,2.8,10,3.1,8.5,3.9C6.3,5.2,5,7.5,5,10v5.5c-0.6,0.5-1,1.2-1,2   C4,18.9,5.1,20,6.5,20h2.7c0.4,1.2,1.5,2,2.8,2s2.4-0.8,2.8-2h2.7c1.4,0,2.5-1.1,2.5-2.5c0-0.8-0.4-1.5-1-2v-3.9c0,0,0,0,0,0   c1.8-0.8,3-2.5,3-4.6C22,4.2,19.8,2,17,2z M17.5,18H14h-4H6.5C6.2,18,6,17.8,6,17.5S6.2,17,6.5,17h11c0.3,0,0.5,0.2,0.5,0.5   S17.8,18,17.5,18z M17,15H7v-5c0-1.8,1-3.4,2.5-4.3C10.4,5.2,11.4,5,12.4,5C12.1,5.6,12,6.3,12,7c0,2.8,2.2,5,5,5V15z M17,10   c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S18.7,10,17,10z" />

                      <path d="M18.7,5.3c-0.4-0.4-1-0.4-1.4,0L17,5.6l-0.3-0.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L15.6,7l-0.3,0.3c-0.4,0.4-0.4,1,0,1.4   C15.5,8.9,15.7,9,16,9s0.5-0.1,0.7-0.3L17,8.4l0.3,0.3C17.5,8.9,17.7,9,18,9s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L18.4,7l0.3-0.3   C19.1,6.3,19.1,5.7,18.7,5.3z" />
                    </g>
                  </svg>
                }
              />
            </Suspense>
            {/* ADMIN PRODUCT HERE */}
            <Links slug="/dashboard/admin/products" title="product card">
              <Suspense fallback={<div>Loading...</div>}>
                <StatCard
                  error={error1}
                  length={loading1 ? 0 : adminStats?.product}
                  name="Total Products"
                  svg={
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect x="0" fill="none" width="20" height="20" />
                      <g>
                        <path d="M17 8h1v11H2V8h1V6c0-2.76 2.24-5 5-5 .71 0 1.39.15 2 .42.61-.27 1.29-.42 2-.42 2.76 0 5 2.24 5 5v2zM5 6v2h2V6c0-1.13.39-2.16 1.02-3H8C6.35 3 5 4.35 5 6zm10 2V6c0-1.65-1.35-3-3-3h-.02c.63.84 1.02 1.87 1.02 3v2h2zm-5-4.22C9.39 4.33 9 5.12 9 6v2h2V6c0-.88-.39-1.67-1-2.22z" />
                      </g>
                    </svg>
                  }
                />
              </Suspense>
            </Links>
            {/* USER START HERE */}
            <Suspense fallback={<div>Loading...</div>}>
              <StatCard
                error={error1}
                length={loading1 ? 0 : adminStats?.user}
                name="Total Users"
                svg={<FaUserCheck />}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
