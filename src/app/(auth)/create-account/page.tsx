"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface FormData {
  username: string;
  email: string;
  password: string;
}

export default function Page() {
  const router = useRouter();
  const [error, setError] = useState("");

  const [data, setData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const SubmitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/register", data);
      const res = response.data;
      if (res.error) {
        setError(res.error);
      } else {
        setError(res.message);
        setData({
          username: "",
          email: "",
          password: "",
        });
        router.push("/sign-in");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred during registration.");
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
            className="sm:h-screen h-60 w-full"
            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 750px"
            priority
          />
        </div>
        <div className="md:col-span-4 md:px-8 px-4 my-10">
          <form onSubmit={SubmitHandle} className="mt-10">
            <div>
              <h2 className="text-gray-900 lg:text-3xl text-2xl">
                Create Account
              </h2>
              <p className="my-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
                ad.
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-base font-medium text-gray-700 mb-2"
              >
                User Name :
              </label>
              <div>
                <input
                  className="shadow-sm rounded-md w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  type="text"
                  value={data.username}
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                  placeholder="Enter your Username"
                />
              </div>
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
            <p className="text-red-500 text-center my-2">{error && error}</p>

            <button className="btn">Create Account</button>
            <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
              Already have an account?
              <Link className="link ml-2" href="/sign-in">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
