"use client";
import { useState } from "react";
import style from "@/src/app/(auth)/form.module.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Container from "@/src/components/ui/Container";
import { Heading3 } from "@/src/components/ui/Typography";
import Label from "@/src/components/ui/Label";
import Input from "@/src/components/ui/Input";
import { useAuth } from "@/src/components/contexts/authContext";
import axios from "axios";
import { ADDRESS_API_Endpoint } from "@/src/utils/constant";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

interface FormData {
  phone1: string;
  addressLine1: string;
  country: string;
  city: string;
  postalCode: string;
}

export default function Address() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { session, user } = useAuth();
  const { update } = useSession();
  const router = useRouter();

  const [addressData, setAddressData] = useState<FormData>({
    phone1: "",
    addressLine1: "",
    country: "",
    city: "",
    postalCode: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!addressData.city) {
      toast.error("Enter Your City Name");
      return;
    }
    if (!addressData.country) {
      toast.error("Enter Your Country Name");
      return;
    }
    if (!addressData.phone1) {
      toast.error("Enter Your Phone 1");
      return;
    }
    if (addressData.phone1.length !== 11) {
      toast.error("Enter Your Correct phone 1 Number Format");
      return;
    }
    if (!addressData.addressLine1) {
      toast.error("Enter Your address 1");
      return;
    }
    if (!addressData.postalCode) {
      toast.error("Enter Your Postal Code");
      return;
    }
    try {
      setLoading(true);
      if (!session) {
        return null;
      }
      await axios.post(`${ADDRESS_API_Endpoint}/post`, {
        phone1: addressData.phone1,
        addressLine1: addressData.addressLine1,
        country: addressData.country,
        city: addressData.city,
        postalCode: addressData.postalCode,
        user: user,
      });

      const newSession = {
        ...session,
        user: {
          ...session?.user,
        },
      };

      await update(newSession);
      setAddressData({
        phone1: "",
        addressLine1: "",
        country: "",
        city: "",
        postalCode: "",
      });

      router.push("/profile");
    } catch (error) {
      setError("Error during User Address Update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="my-10">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Heading3 title="Add Shipping Detail" />
          </div>

          <form className="mt-5 sm:mt-10" onSubmit={handleSubmit}>
            {error && <span className="text-red-500">{error}</span>}

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <Label label="Phone Number 1" htmlFor="Phone Number 1" />
                <div className="mt-2.5">
                  <Input
                    type="number"
                    value={addressData.phone1}
                    placeholder="xx xxx xxxx xxx"
                    onChange={(e) =>
                      setAddressData({
                        ...addressData,
                        phone1: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <Label label="Address Line 1" htmlFor="Address Line 1" />
                <div className="mt-2.5">
                  <Input
                    type="text"
                    placeholder="Enter Your Address 1"
                    value={addressData.addressLine1}
                    onChange={(e) =>
                      setAddressData({
                        ...addressData,
                        addressLine1: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3 my-4">
              <div>
                <Label label="Country" htmlFor="Country" />
                <div className="mt-2.5">
                  <Input
                    type="text"
                    placeholder="Enter Your Country"
                    value={addressData.country}
                    onChange={(e) =>
                      setAddressData({
                        ...addressData,
                        country: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <Label label="City" htmlFor="City" />
                <div className="mt-2.5">
                  <Input
                    type="text"
                    placeholder="Enter Your City"
                    value={addressData.city}
                    onChange={(e) =>
                      setAddressData({
                        ...addressData,
                        city: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <Label label="Postal Code" htmlFor="Postal Code" />
                <div className="mt-2.5">
                  <Input
                    type="text"
                    placeholder="Enter Your Zip Code"
                    value={addressData.postalCode}
                    onChange={(e) =>
                      setAddressData({
                        ...addressData,
                        postalCode: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6">
              <button type="submit" className={`sm:col-span-2 ${style.btn}`}>
                {loading ? "Loading .." : "Submit Here"}
              </button>
            </div>
          </form>
        </Container>
      </div>
    </>
  );
}
