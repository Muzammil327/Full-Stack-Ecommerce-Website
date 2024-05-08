"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useAuth } from "@/src/components/context/authContext";
import Label from "@/src/components/element/Form/Label";
import Input from "@/src/components/element/Form/Input";
import Processing from "@/src/components/element/Loading/Processing";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { session } = useAuth();

  const router = useRouter();

  const [data, setData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const SubmitHandle = async (e: any) => {
    e.preventDefault(); // Prevent form submission
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
        setError("Invalid Credentials");
        return;
      }
      setData({
        email: "",
        password: "",
      });

      router.push(
        session?.user.role === process.env.NEXT_PUBLIC_USER_ROUTE
          ? "/profile"
          : "/admin"
      );
    } catch (error) {
      console.error("An error occurred during sign in:", error);
      setError("An error occurred during sign in.");
    } finally {
      setLoading(false);
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
              <h2 className="text-gray-900 lg:text-3xl text-2xl">Sign In</h2>
              <p className="my-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
                ad.
              </p>
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
              {loading ? <Processing /> : "Sign In"}
            </button>
            <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
              No Already have an account?
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
