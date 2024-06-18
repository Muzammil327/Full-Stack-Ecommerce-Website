"use client";
import React, { useState } from "react";
import Link from "next/link";
import Input from "@/src/components/ui/Input";
import Label from "@/src/components/ui/Label";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useAuth } from "@/src/components/contexts/authContext";
import Processing from "@/src/components/ui/Loading/Processing";
import { LoginFormData } from "@/src/types/user";

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
      <form onSubmit={SubmitHandle} className="mt-10">
        <div>
          <h2 className="text-gray-900 lg:text-3xl text-2xl">Sign In</h2>
          <p className="my-4">
            Welcome back! Sign in to access your account, track your orders,
            save your favorite items, and enjoy a seamless shopping experience.
            We&rsquo;re glad to see you again!
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
          <Link href="/create-account" className="text-gray-500 ml-2">
            Create Account
          </Link>
        </p>
      </form>
    </>
  );
}
