"use client";
import React, { useState } from "react";
import {
  Button,
  Processing,
  Label,
  Input,
  Heading1,
  Lead,
} from "@/src/components/ui/ui";
import { useRouter } from "next/navigation";
import { LoginIprops } from "@/src/types/auth/page";
import { LoginAction } from "@/src/action/auth/LoginAction";

export default function SignView() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [data, setData] = useState<LoginIprops>({
    email: "",
    password: "",
  });

  return (
    <form onSubmit={(e) => LoginAction(e, data, setLoading, router)}>
      {" "}
      <Heading1 title="Sign In" className="text-center" />
      <Lead
        className="py-6"
        title="Welcome back! Sign in to access your account, track your orders,
            save your favorite items, and enjoy a seamless shopping experience.
            We&rsquo;re glad to see you again!"
      />
      <div className="my-6">
        <Label
          label="Email Address :"
          htmlFor="email"
          ariaLabel="Enter Email"
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
          ariaLabel="Enter Password"
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
      <Button variant="solid" type="submit" disabled={loading} title="sign in">
        {loading ? <Processing /> : "Sign In"}
      </Button>
    </form>
  );
}
