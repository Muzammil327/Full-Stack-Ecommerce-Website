"use server";
import React from "react";
import { cookies } from "next/headers";
import VerifyEmailBtn from "@/src/components/auth/activate/verifyEmailBtn";

export default async function VerifyEmailView() {
  const cookieStore = cookies();
  const activationToken = cookieStore.get("activationToken");

  return <VerifyEmailBtn activationToken={activationToken} />;
}
