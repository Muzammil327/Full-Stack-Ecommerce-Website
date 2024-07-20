"use client";
import React from "react";
import { Button } from "@/src/components/ui/ui";
import axios from "axios";
import { toast } from "react-toastify";

async function verifyEmail(token: any) {
  try {
    const response = await axios.post(`/api/auth/verify-email?token=${token}`);
    if (response.data.statusbar === 200) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.error);
    }
  } catch (error) {
    throw new Error("Failed to verify email");
  }
}

export default function VerifyEmailBtn({ activationToken }: any) {
  const verifyEmailAndRedirect = async () => {
    if (activationToken && activationToken.value) {
      try {
        await verifyEmail(activationToken.value);
      } catch (error) {
        console.error("Error verifying email:", error);
      }
    } else {
      console.error("No activation token found.");
    }
  };

  return (
    <div>
      <Button className="button_bg" onClick={verifyEmailAndRedirect} title="send email verfication link">
        Send Email Verification Link
      </Button>
      <p>Check also spam folder.</p>
    </div>
  );
}
