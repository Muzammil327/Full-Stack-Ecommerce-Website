"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "@/src/app/(auth)/form.module.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ADDRESS_API_Endpoint, USER_API_Endpoint } from "@/src/utils/constant";
import { useAuth } from "@/src/components/contexts/authContext";
import Label from "@/src/components/ui/Label";
import Input from "@/src/components/ui/Input";

interface FormData {
  phone1: string;
  phone2: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  city: string;
  postalCode: string;
  additionalInfo: string;
}

export default function BillingAddress() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { session, user } = useAuth();
  const { update } = useSession();
  const router = useRouter();
  const [id, setId] = useState();
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
        setAddressData(userDataFromApi);
        setId(response.data._id);
      } catch (error) {
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      });
      const res = response.data;

      if (res.error) {
        setError(res.error);
      } else {
        setError(res.message);

        await update();
      }
    } catch (error) {
      setError("Error during Product Category Update");
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
              <div className="mt-2.5">
                <Input
                  type="number"
                  value={addressData.phone2}
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

            <button type="submit" className={`sm:col-span-2 ${style.btn}`}>
              {loading ? "Loading .." : "Submit Here"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
