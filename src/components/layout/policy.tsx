import React from "react";
import { FaComment, FaQuestion } from "react-icons/fa6";
import { Container } from "@/src/components/ui/ui";
import { FaCashRegister, FaShippingFast } from "react-icons/fa";

export default function Policy() {
  return (
    <Container>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 md:my-12 my-6">
        {data.map((data: any) => {
          return (
            <div
              className="border border-solid lg:py-4 py-3 lg:px-4 px-3 flex md:items-center items-center md:flex-row flex-col md:justify-start justify-center"
              key={data.id}
            >
              <div className="bg-color1 hover:bg-transparent border-2 border-solid border-color1 p-4 rounded-md text-color3 hover:text-color1 text-2xl">
                {data.icon}
              </div>
              <div className="lg:ml-5 sm:ml-4 ml-3 md:text-left text-center md:mt-0 mt-4">
                <h3 className="md:text-lg text-xl">{data.name}</h3>
                <p className="md:text-sm text-base">{data.para}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

const data = [
  {
    id: 0,
    name: "Fast Delivery",
    para: "Lightning-fast shipping for quick delivery.",
    icon: <FaShippingFast />,
  },
  {
    id: 1,
    name: "Online Support",
    para: "Our customer support is available 24/7.",
    icon: <FaComment />,
  },
  {
    id: 2,
    name: "Have Questions?",
    para: "Get in touch with us for any queries.",
    icon: <FaQuestion />,
  },
  {
    id: 3,
    name: "Cash on Delivery",
    para: "Pay when you receive your order at your doorstep.",
    icon: <FaCashRegister />,
  },
];
