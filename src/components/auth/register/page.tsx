"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";

import Input from "@/src/components/ui/Loading/Input";
import Label from "@/src/components/ui/Label";
import Processing from "@/src/components/ui/Loading/Processing";
import Button from "@/src/components/ui/Loading/Buttons";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

export default function RegisterAccountView() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [data, setData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
  });

  const SubmitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/register", data);
      if (response.data.statusbar === 400) {
        toast.error(response.data.error);
      } else {
        setData({
          username: "",
          email: "",
          password: "",
        });
        toast.success("Plz Activate Your Email");
        router.push("/activate");
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
      toast.warning("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={SubmitHandle} className="my-20">
        <div>
          <h2 className="text-gray-900 lg:text-3xl text-2xl text-center t1">
            Create Account
          </h2>
          <p className="my-4 text-center px-2 text-gray-500 text-base">
            Join our shopping community today! Creating an account allows you to
            enjoy a personalized shopping experience, track your orders, save
            your favorite items, and receive exclusive offers and updates.
          </p>
        </div>
        <div className="my-6">
          <Label label="User Name :" htmlFor="username" />
          <Input
            type="text"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            placeholder="Enter your Username"
          />
        </div>

        <div className="mb-6">
          <Label label="Email Address :" htmlFor="email" />
          <Input
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="Enter your Email"
          />
        </div>

        <div className="mb-6">
          <Label label="Password :" htmlFor="password" />
          <Input
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder="Enter your Password"
          />
        </div>
        <Button className="button_bg w-full" disabled={loading}>
          {loading ? <Processing /> : "Create Account"}
        </Button>

        <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-600 antialiased">
          Already have an account?
          <Link href="/sign-in" className="ml-2 link1">
            Sign In
          </Link>
        </p>
      </form>
    </>
  );
}
