"use server";
import { cookies } from "next/headers";
import React from "react";
import VerifyEmailBtn from "./verifyEmailBtn";

export default async function VerifyEmailView() {
  const cookieStore = cookies();
  const activationToken = cookieStore.get("activationToken");

  return <VerifyEmailBtn activationToken={activationToken} />;
}
