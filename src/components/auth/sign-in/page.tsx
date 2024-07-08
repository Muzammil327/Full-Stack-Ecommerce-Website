"use client";
import React, { useState } from "react";
import Input from "@/src/components/ui/Loading/Input";
import Label from "@/src/components/ui/Label";
import { signIn } from "next-auth/react";
import Processing from "@/src/components/ui/Loading/Processing";
import Button from "@/src/components/ui/Loading/Buttons";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export interface LoginFormData {
  email: string;
  password: string;
}

export default function SignView() {
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const [data, setData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const SubmitHandle = async (e: any) => {
    e.preventDefault(); // Prevent form submission
    setLoading(true);

    if (!data.email || !data.password) {
      setLoading(false);
      return toast.error("Email and password are required.");
    }
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (response?.error) {
        toast.error(response.error);
      }
      console.log("response:", response);
      console.log("signIn:", signIn);
      router.push("/dashboard")
    } catch (error) {
      toast.warning("Internal server Error.");
    }
  };

  return (
    <>
      <form onSubmit={SubmitHandle} className="my-20">
        <div>
          <h2 className="text-gray-900 lg:text-3xl text-2xl text-center t1">
            Sign In
          </h2>
          <p className="my-4 text-center px-2 text-gray-500 text-base">
            Welcome back! Sign in to access your account, track your orders,
            save your favorite items, and enjoy a seamless shopping experience.
            We&rsquo;re glad to see you again!
          </p>
        </div>
        <div className="my-6">
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
          {loading ? <Processing /> : "Sign In"}
        </Button>
        <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
          {/* <Link href="/forgot-you-password" className="link1 ml-2"> */}
          Forgot Your Passord?
          {/* </Link> */}
        </p>
      </form>
    </>
  );
}
