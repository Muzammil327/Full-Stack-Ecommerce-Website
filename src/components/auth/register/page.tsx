"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Processing,
  Label,
  Input,
  Heading1,
  Lead,
  Links,
} from "@/src/components/ui/ui";
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
        toast.success("Plz Sign In with your Email");
        router.push("/sign-in");
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
      toast.warning("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={SubmitHandle} className="my-20">
      <Heading1 title="Create Account" className="text-center" />
      <Lead
        className="py-6"
        title="Join our shopping community today! Creating an account allows you to
        enjoy a personalized shopping experience, track your orders, save your
        favorite items, and receive exclusive offers and updates."
      />

      <div className="my-6">
        <Label label="User Name :" htmlFor="username" />
        <Input
          type="text"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          placeholder="Enter your Username" name={"username"}        />
      </div>

      <div className="mb-6">
        <Label label="Email Address :" htmlFor="email" />
        <Input
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder="Enter your Email" name={"email"}        />
      </div>

      <div className="mb-6">
        <Label label="Password :" htmlFor="password" />
        <Input
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          placeholder="Enter your Password" name={"password"}        />
      </div>
      <Button className="button_solid w-full" disabled={loading} title="create account">
        {loading ? <Processing /> : "Create Account"}
      </Button>

      <p className="my-8 block text-center">
        Already have an account?
        <Links slug="/sign-in" className="ml-2" title="register user">
          Sign In
        </Links>
      </p>
    </form>
  );
}
