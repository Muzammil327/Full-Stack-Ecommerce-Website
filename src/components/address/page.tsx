"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Label,
  Input,
  Heading3,
  Container,
  Button,
} from "@/src/components/ui/ui";
import axios from "axios";
import { toast } from "react-toastify";

interface FormData {
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  city: string;
  country: string;
  phone1: string;
  phone2: string;
  additionalInfo: string;
}

export default function AddressView() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { data: session } = useSession();
  const userId = session?.user?._id;
  const { update } = useSession();
  const router = useRouter();

  const [addressData, setAddressData] = useState<FormData>({
    phone1: "",
    phone2: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    city: "",
    postalCode: "",
    additionalInfo: "",
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
      toast.error("Enter Your Correct phone 2 Number Format");
      return;
    }
    if (!addressData.phone2) {
      toast.error("Enter Your Phone 2");
      return;
    }
    if (addressData.phone2.length !== 11) {
      toast.error("Enter Your Correct phone 1 Number Format");
      return;
    }
    if (!addressData.addressLine1) {
      toast.error("Enter Your address 1");
      return;
    }
    if (!addressData.addressLine2) {
      toast.error("Enter Your address 2");
      return;
    }
    if (!addressData.postalCode) {
      toast.error("Enter Your Postal Code");
      return;
    }
    if (!addressData.additionalInfo) {
      toast.error("Enter Your Additional Information");
      return;
    }
    try {
      setLoading(true);
      if (!session) {
        return null;
      }
      await axios.put(`/api/auth/address/${userId}`, {
        phone1: addressData.phone1,
        phone2: addressData.phone2,
        addressLine1: addressData.addressLine1,
        addressLine2: addressData.addressLine2,
        country: addressData.country,
        city: addressData.city,
        postalCode: addressData.postalCode,
        additionalInfo: addressData.additionalInfo,
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
        phone2: "",
        addressLine1: "",
        addressLine2: "",
        country: "",
        city: "",
        postalCode: "",
        additionalInfo: "",
      });
      fetchUserData();
    } catch (error) {
      setError("Error during User Address Update");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/auth/address/${userId}`);
      const userDataFromApi: FormData = response.data.get_user_address;
      if (userDataFromApi) {
        setAddressData(userDataFromApi);
      }
    } catch (error) {
      setError("Error fetching Address User data");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [fetchUserData, userId]);

  return (
    <>
      <div className="my-10">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Heading3 title="Add Shipping Detail" className="" />
          </div>

          <form className="mt-5 sm:mt-10" onSubmit={handleSubmit}>
            {error && <span className="text-red-500">{error}</span>}

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <Label label="Phone Number 1" htmlFor="Phone Number 1" />
                <div className="">
                  <Input
                    name="phone1"
                    type="number"
                    value={addressData.phone1 || ""}
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
                <Label label="Phone Number 2" htmlFor="Phone Number 2" />
                <div className="">
                  <Input
                    name="phone2"
                    type="number"
                    value={addressData.phone2 || ""}
                    placeholder="xx xxx xxxx xxx"
                    onChange={(e) =>
                      setAddressData({
                        ...addressData,
                        phone2: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 my-4">
              <div>
                <Label label="Address Line 1" htmlFor="Address Line 1" />
                <div className="">
                  <Input
                    name="address1"
                    type="text"
                    placeholder="Enter Your Address 1"
                    value={addressData.addressLine1 || ""}
                    onChange={(e) =>
                      setAddressData({
                        ...addressData,
                        addressLine1: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <Label label="Address Line 2" htmlFor="Address Line 2" />
                <div className="">
                  <Input
                    name="address2"
                    type="text"
                    placeholder="Enter Your Address 2"
                    value={addressData.addressLine2 || ""}
                    onChange={(e) =>
                      setAddressData({
                        ...addressData,
                        addressLine2: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3 my-4">
              <div>
                <Label label="Country" htmlFor="Country" />
                <div className="">
                  <Input
                    name="country"
                    type="text"
                    placeholder="Enter Your Country"
                    value={addressData.country || ""}
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
                <div className="">
                  <Input
                    name="city"
                    type="text"
                    placeholder="Enter Your City"
                    value={addressData.city || ""}
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
                <div className="">
                  <Input
                    name="zip code"
                    type="text"
                    placeholder="Enter Your Zip Code"
                    value={addressData.postalCode || ""}
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

            <div className="grid grid-cols-1 gap-x-8 my-4">
              <Label
                label="Enter Additional Information"
                htmlFor="Enter Additional Information"
              />

              <textarea
                className="shadow-sm rounded-md w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-2"
                value={addressData.additionalInfo || ""}
                placeholder="Enter Your Nearby shops"
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    additionalInfo: e.target.value,
                  })
                }
              ></textarea>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-6">
              <Button className="button_solid px-6" title="add address here">
                {loading ? "Loading .." : "Submit Here"}
              </Button>
            </div>
          </form>
        </Container>
      </div>
    </>
  );
}
