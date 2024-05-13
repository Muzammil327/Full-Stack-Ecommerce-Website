"use client";
import Input from "@/src/components/ui/Input";
import Label from "@/src/components/ui/Label";
import Processing from "@/src/components/ui/Loading/Processing";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const [data, setData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
  });

  const SubmitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

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
      console.error("An error occurred during registration:", error);
      setError("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={SubmitHandle} className="mt-10">
        <div>
          <h2 className="text-gray-900 lg:text-3xl text-2xl">Create Account</h2>
          <p className="my-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, ad.
          </p>
        </div>
        <div className="mb-4">
          <Label label="User Name :" htmlFor="username" />
          <Input
            type="text"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            placeholder="Enter your Username"
          />
        </div>

        <div className="mb-4">
          <Label label="Email Address :" htmlFor="email" />
          <Input
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="Enter your Email"
          />
        </div>

        <div className="mb-4">
          <Label label="Password :" htmlFor="password" />
          <Input
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder="Enter your Password"
          />
        </div>
        <p className="text-red-500 text-center my-2">{error && error}</p>
        <button className="btn" disabled={loading}>
          {loading ? <Processing /> : "Create Account"}
        </button>

        <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
          Already have an account?
          <Link href="/sign-in" className="text-gray-500 ml-2">
            Sign In
          </Link>
        </p>
      </form>
    </>
  );
}
