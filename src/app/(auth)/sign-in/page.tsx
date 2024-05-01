"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import isTokenExpired from "@/src/components/function/isTokenExpired";

interface FormData {
  email: string;
  password: string;
}

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  const [data, setData] = useState<FormData>({
    email: "",
    password: "",
  });

  const SubmitHandle = async (e: any) => {
    setLoading(true);
    e.preventDefault(); // Prevent form submission
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        console.log("Invalid Credentials");
        return;
      }
      setLoading(false);

      router.push(session?.user.role === "user" ? "/profile" : "/admin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="grid md:grid-cols-8">
        <div className="md:col-span-4">
          <Image
            src="/3.jpg"
            alt=""
            height={430}
            width={750}
            className="md:h-screen h-60 w-full"
            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 750px"
            priority
          />
        </div>
        <div className="md:col-span-4 px-8 my-10">
          <form onSubmit={SubmitHandle} className="mt-10">
            <div>
              <h2 className="text-gray-900 lg:text-3xl text-2xl">
                Sign In
              </h2>
              <p className="my-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
                ad.
              </p>
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-base font-medium text-gray-700 mb-2"
              >
                Email Address :
              </label>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="shadow-sm rounded-md w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your Email"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-base font-medium text-gray-700 mb-2"
              >
                Password :
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="shadow-sm rounded-md w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="Enter your Password"
              />
            </div>

            <button className="btn">{loading ? "Loading.." : "Sign In"}</button>
            <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
              Already have an account?
              <Link className="link ml-2" href="/create-account">
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
