"use client";
import React, { useState } from "react";
import { RegisterIprops } from "@/src/types/auth/page";
import {
  Button,
  Processing,
  Label,
  Input,
  Heading1,
  Lead,
  Links,
} from "@/src/components/ui/ui";
import { useRouter } from "next/navigation";
import RegisterAction from "@/src/action/auth/RegisterAction";

export default function RegisterAccountView() {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<RegisterIprops>({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  return (
    <form
      onSubmit={(e) => RegisterAction(e, data, setLoading, setData, router)}
    >
      <Heading1 title="Create Account" className="text-center" />
      <Lead
        className="py-6"
        title="Join our shopping community today! Creating an account allows you to
        enjoy a personalized shopping experience, track your orders, save your
        favorite items, and receive exclusive offers and updates."
      />

      <div className="my-6">
        <Label
          label="User Name :"
          htmlFor="username"
        />
        <Input
          type="text"
          value={data.username}
          placeholder="Enter your Username"
          onChange={(e) => setData({ ...data, username: e.target.value })}
          name="username"
          ariaLabel="Enter Username"
          disabled={loading}
        />
      </div>

      <div className="mb-6">
        <Label
          label="Email Address :"
          htmlFor="email"
        />
        <Input
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder="Enter your Email"
          name="email"
          ariaLabel="Enter Email"
          disabled={loading}
        />
      </div>

      <div className="mb-6">
        <Label
          label="Password :"
          htmlFor="password"
        />
        <Input
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          placeholder="Enter your Password"
          name="password"
          ariaLabel="Enter Password"
          disabled={loading}
        />
      </div>
      <Button
        variant="solid"
        type="submit"
        disabled={loading}
        title="create account"
      >
        {loading ? <Processing /> : "Create Account"}
      </Button>

      <p className="my-8 block text-center">
        Already have an account ?
        <Links slug="/sign-in" className="ml-2" title="signin user">
          Sign In
        </Links>
      </p>
    </form>
  );
}
