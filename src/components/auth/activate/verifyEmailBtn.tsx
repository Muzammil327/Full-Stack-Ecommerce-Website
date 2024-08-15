"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/src/components/ui/ui";
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
  const [loading, setLoading] = useState<boolean>(false);
  const verifyEmailAndRedirect = async () => {
    if (activationToken && activationToken.value) {
      try {
        setLoading(true);
        await verifyEmail(activationToken.value);
      } catch (error) {
        console.error("Error verifying email:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("No activation token found.");
    }
  };

  return (
    <div>
      <Button
        className="button_solid px-5"
        onClick={verifyEmailAndRedirect}
        title="send email verfication link"
        disabled={loading}
      >
        Send Email Verification Link
      </Button>
      <p>Check also spam folder.</p>
    </div>
  );
}
