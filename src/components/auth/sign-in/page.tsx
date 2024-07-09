"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import {
  Button,
  Processing,
  Label,
  Input,
  Heading1,
  Lead,
  Links,
  Paragraph,
} from "@/src/components/ui/ui";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export interface LoginFormData {
  email: string;
  password: string;
}

export default function SignView() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
      router.push("/dashboard");
    } catch (error) {
      toast.warning("Internal server Error.");
    }
  };

  return (
    <form onSubmit={SubmitHandle} className="my-20">
      <Heading1 title="Sign In" className="text-center" />
      <Lead
        className="py-6"
        title="Welcome back! Sign in to access your account, track your orders,
            save your favorite items, and enjoy a seamless shopping experience.
            We&rsquo;re glad to see you again!"
      />
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
      <Button className="button_solid w-full" disabled={loading}>
        {loading ? <Processing /> : "Sign In"}
      </Button>
      <Paragraph
        title="Forgot Your Passord?"
        className="text-center text-gray-700 my-8"
      />
    </form>
  );
}
