"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ADDRESS_API_Endpoint } from "@/src/utils/constant";
import { useAuth } from "@/src/components/contexts/authContext";
import Label from "@/src/components/ui/Label";
import Input from "@/src/components/ui/Input";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface FormData {
  _id?: string | undefined;
  phone1: string;
  phone2: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  city: string;
  postalCode: string;
  additionalInfo: string;
}

export default function BillingAddress({ setIsFormFilled }: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const router = useRouter();
  const { update } = useSession();
  const [show, setShow] = useState(false);
  const [id, setId] = useState<string>();

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${ADDRESS_API_Endpoint}/get/${user}`);
        const userDataFromApi: FormData = response.data;
        sessionStorage.setItem("checkout Page Router", window.location.href);

        if (!response.data) {
          return router.push("/profile/address");
        }
        setAddressData(userDataFromApi);
        setId(userDataFromApi._id);
      } catch (error) {
        setError("Error fetching Address User data");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [addressData.phone1, router, user]);

  useEffect(() => {
    if (
      addressData.phone1 &&
      addressData.phone2 &&
      addressData.addressLine1 &&
      addressData.addressLine2 &&
      addressData.country &&
      addressData.city &&
      addressData.additionalInfo &&
      addressData.postalCode
    ) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [
    addressData.phone1,
    addressData.phone2,
    addressData.addressLine1,
    addressData.addressLine2,
    addressData.country,
    addressData.city,
    addressData.postalCode,
    addressData.additionalInfo,
  ]);

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
    if (!addressData.phone2) {
      toast.error("Enter Your Phone 2");
      return;
    }
    if (addressData.phone1.length !== 11) {
      toast.error("Enter Your Correct phone 1 Number Format");
      return;
    }
    if (addressData.phone2.length !== 11) {
      toast.error("Enter Your Correct phone 2 Number Format");
      return;
    }
    if (addressData.phone2 === addressData.phone1) {
      toast.error("Not Same Phone Number");
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
      toast.error("Enter Your Additional Info");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.put(`${ADDRESS_API_Endpoint}/update/${id}`, {
        phone1: addressData.phone1,
        phone2: addressData.phone2,
        addressLine1: addressData.addressLine1,
        addressLine2: addressData.addressLine2,
        country: addressData.country,
        city: addressData.city,
        postalCode: addressData.postalCode,
        additionalInfo: addressData.additionalInfo,
        user,
      });
      const res = response.data;

      if (res.error) {
        toast.error(res.error);
        return;
      } else {
        toast.success(res.message);

        await update();
        setIsFormFilled(true);
      }
    } catch (error) {
      setError("Error during Product Category Update");
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="my-2 mx-4">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-xl font-bold tracking-tight text-gray-900">
            Add Shpping Address Here
          </h3>
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
                  placeholder="03xx xxxx xxx"
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
              <div className="mt-2.5">
                <Input
                  type="number"
                  value={addressData.phone2}
                  placeholder="03xx xxxx xxx"
                  onChange={(e) =>
                    setAddressData({
                      ...addressData,
                      phone2: e.target.value,
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
            <div>
              <Label label="Address Line 2" htmlFor="Address Line 2" />
              <div className="mt-2.5">
                <Input
                  type="text"
                  placeholder="Enter Your Address 2"
                  value={addressData.addressLine2}
                  onChange={(e) =>
                    setAddressData({
                      ...addressData,
                      addressLine2: e.target.value,
                    })
                  }
                />
              </div>
            </div>{" "}
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
            <div>
              <Label label="Additional Info" htmlFor="Additional Info" />
              <div className="mt-2.5">
                <textarea
                  placeholder="Enter Your Additional Info"
                  value={addressData.additionalInfo}
                  onChange={(e) =>
                    setAddressData({
                      ...addressData,
                      additionalInfo: e.target.value,
                    })
                  }
                  className="shadow-sm rounded-md w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                ></textarea>
              </div>
            </div>

            {show && (
              <>
                <button type="submit" className={`sm:col-span-2 btn`}>
                  {loading ? "Loading .." : "Submit Here"}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
