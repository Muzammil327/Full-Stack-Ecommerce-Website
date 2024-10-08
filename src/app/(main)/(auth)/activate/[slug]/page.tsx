"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Heading1 } from "@/src/components/ui/ui";

async function verifyEmail(token: any) {
  try {
    const response = await axios.put(`/api/auth/verify-email?token=${token}`);
    if (response.data.statusbar) {
      toast.error(response.data.error);
    } else {
      return;
    }
  } catch (error) {
    throw new Error("Failed to verify email");
  }
}

export default function ActivatePage() {
  const { slug } = useParams(); // Extract token from query parameter
  const router = useRouter();
  const [activationStatus, setActivationStatus] = useState("Verifying...");

  useEffect(() => {
    const verifyEmailAndRedirect = async () => {
      try {
        if (slug) {
          // Call backend API to verify email
          await verifyEmail(slug);
          // If email verification succeeds, update activation status and redirect to sign-in page
          setActivationStatus("Email verified successfully!");
          router.push("/sign-in");
        }
      } catch (error) {
        // If email verification fails, log the error and update activation status
        console.error("Error verifying email:", error);
        setActivationStatus("Failed to verify email");
      }
    };

    verifyEmailAndRedirect();
  }, [slug, router]); // Dependencies: 'slug' and 'router'

  return (
    <main>
      <Heading1 title={activationStatus} className="text-center" />
    </main>
  );
}
