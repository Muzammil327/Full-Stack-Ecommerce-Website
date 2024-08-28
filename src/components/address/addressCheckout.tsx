"use client";
import { useCallback, useEffect, useState } from "react";
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
import Select from "../ui/Select";

interface FormData {
  addressLine: string;
  postalCode: string;
  city: string;
  country: string;
  province: string;
  phone1: string;
  phone2: string;
  additionalInfo: string;
}

export default function AddressCheckoutView({ setIsFormFilled }: any) {
  const [loading, setLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [error, setError] = useState("");

  const { data: session } = useSession();
  const userId = session?.user?._id;
  const { update } = useSession();

  const [addressData, setAddressData] = useState<FormData>({
    phone1: "",
    phone2: "",
    addressLine: "",
    country: "",
    province: "",
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
    if (!addressData.province) {
      toast.error("Enter Your Province Name");
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
    if (!addressData.addressLine) {
      toast.error("Enter Your address");
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
        province: addressData.province,
        addressLine: addressData.addressLine,
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
      fetchUserData();
      await update(newSession);
      setAddressData({
        phone1: "",
        phone2: "",
        addressLine: "",
        country: "",
        province: "",
        city: "",
        postalCode: "",
        additionalInfo: "",
      });
      setIsFormFilled(true);
    } catch (error) {
      setError("Error during User Address Update");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      addressData.phone1 &&
      addressData.phone2 &&
      addressData.addressLine &&
      addressData.country &&
      addressData.province &&
      addressData.city &&
      addressData.additionalInfo &&
      addressData.postalCode
    ) {
      setShowBtn(true);
    }
  }, [
    addressData.phone1,
    addressData.phone2,
    addressData.addressLine,
    addressData.country,
    addressData.province,
    addressData.city,
    addressData.postalCode,
    addressData.additionalInfo,
    setShowBtn,
  ]);

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

  const selectedProvince = ProvinceOptions.find(
    (province) => province.value === addressData.province
  );

  return (
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
                  value={addressData.addressLine || ""}
                  onChange={(e) =>
                    setAddressData({
                      ...addressData,
                      addressLine: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <Label label="Country" htmlFor="Country" />
              <div className="">
                <Select
                  options={CountryOptions}
                  selectedOption={addressData.country || ""}
                  onChange={(e: any) =>
                    setAddressData({
                      ...addressData,
                      country: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3 my-4">
            <div>
              <Label label="Province" htmlFor="Province" />
              <div className="">
                <Select
                  options={ProvinceOptions}
                  selectedOption={addressData.province || ""}
                  onChange={(e: any) =>
                    setAddressData({
                      ...addressData,
                      province: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <Label label="City" htmlFor="City" />
              <div className="">
                <Select
                  options={selectedProvince?.option || []} // Use the options of the selected province
                  selectedOption={addressData.city || ""}
                  onChange={(e: any) =>
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
              className="shadow-sm rounded-md w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
            {showBtn && (
              <Button className="button_solid px-6" title="add address here">
                {loading ? "Loading .." : "Submit Here"}
              </Button>
            )}
          </div>
        </form>
      </Container>
    </div>
  );
}

const CountryOptions = [
  {
    value: "",
    label: "Select Country",
  },
  {
    value: "pakistan",
    label: "Pakistan",
  },
];

const ProvinceOptions = [
  {
    value: "",
    label: "Select Province",
  },
  {
    value: "punjab",
    label: "Punjab",
    option: [
      {
        value: "",
        label: "Select City",
      },
      {
        value: "lahore",
        label: "Lahore",
      },
      {
        value: "faisalabad",
        label: "Faisalabad",
      },
      {
        value: "rawalpindi",
        label: "Rawalpindi",
      },
      {
        value: "gujranwala",
        label: "Gujranwala",
      },
      {
        value: "multan",
        label: "Multan",
      },
      {
        value: "sialkot",
        label: "Sialkot",
      },
      {
        value: "sargodha",
        label: "Sargodha",
      },
      {
        value: "bahawalpur",
        label: "Bahawalpur",
      },
      {
        value: "jhelum",
        label: "Jhelum",
      },
      {
        value: "sheikhupura",
        label: "Sheikhupura",
      },
      {
        value: "gujrat",
        label: "Gujrat",
      },
      {
        value: "sahiwal",
        label: "Sahiwal",
      },
      {
        value: "rahim_yar_khan",
        label: "Rahim Yar Khan",
      },
      {
        value: "kasur",
        label: "Kasur",
      },
      {
        value: "mandi_bahauddin",
        label: "Mandi Bahauddin",
      },
      {
        value: "okara",
        label: "Okara",
      },
      {
        value: "dera_ghazi_khan",
        label: "Dera Ghazi Khan",
      },
      {
        value: "chiniot",
        label: "Chiniot",
      },
      {
        value: "hafizabad",
        label: "Hafizabad",
      },
      {
        value: "muzaffargarh",
        label: "Muzaffargarh",
      },
      {
        value: "wah_cantonment",
        label: "Wah Cantonment",
      },
      {
        value: "khushab",
        label: "Khushab",
      },
      {
        value: "mianwali",
        label: "Mianwali",
      },
      {
        value: "toba_tek_singh",
        label: "Toba Tek Singh",
      },
      {
        value: "jhang",
        label: "Jhang",
      },
      {
        value: "khanewal",
        label: "Khanewal",
      },
      {
        value: "vehari",
        label: "Vehari",
      },
      {
        value: "attock",
        label: "Attock",
      },
      {
        value: "bhakkar",
        label: "Bhakkar",
      },
      {
        value: "lodhran",
        label: "Lodhran",
      },
      {
        value: "narowal",
        label: "Narowal",
      },
      {
        value: "pakpattan",
        label: "Pakpattan",
      },
      {
        value: "shakargarh",
        label: "Shakargarh",
      },
      {
        value: "layyah",
        label: "Layyah",
      },
      {
        value: "chakwal",
        label: "Chakwal",
      },
    ],
  },
  {
    value: "sindh",
    label: "Sindh",
    options: [
      { value: "", label: "Select City" },
      { value: "karachi", label: "Karachi" },
      { value: "hyderabad", label: "Hyderabad" },
      { value: "sukkur", label: "Sukkur" },
      { value: "larkana", label: "Larkana" },
      { value: "mirpurkhas", label: "Mirpurkhas" },
      { value: "nawabshah", label: "Nawabshah" },
      { value: "jacobabad", label: "Jacobabad" },
      { value: "khairpur", label: "Khairpur" },
      { value: "shikarpur", label: "Shikarpur" },
      { value: "badin", label: "Badin" },
      { value: "thatta", label: "Thatta" },
      { value: "dadu", label: "Dadu" },
      { value: "umatota", label: "Umarkot" },
      { value: "gothki", label: "Ghotki" },
      { value: "kashmore", label: "Kashmore" },
      { value: "matiari", label: "Matiari" },
      { value: "jamshoro", label: "Jamshoro" },
      { value: "tando_allahyar", label: "Tando Allahyar" },
      { value: "tando_muhammad_khan", label: "Tando Muhammad Khan" },
      { value: "umarkot", label: "Umarkot" },
    ],
  },
];
