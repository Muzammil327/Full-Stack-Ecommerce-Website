"use client";
import React from "react";
import Button from "@/src/components/ui/Loading/Buttons";
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
        // Call backend API to verify email
        await verifyEmail(activationToken.value);
        // If email verification succeeds, update activation status and redirect to sign-in page
      } catch (error) {
        // If email verification fails, log the error and update activation status
        console.error("Error verifying email:", error);
      }
    } else {
      console.error("No activation token found.");
    }
  };

  return (
    <div>
      <Button className="button_bg" onClick={verifyEmailAndRedirect}>
        Send Email Verification Link
      </Button>
      <p>Check also spam folder.</p>
    </div>
  );
}
