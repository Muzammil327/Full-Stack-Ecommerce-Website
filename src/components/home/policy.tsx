import React from "react";
import { FaComment, FaQuestion, FaShip } from "react-icons/fa6";
import Container from "../ui/Container";
import { FaCashRegister, FaShippingFast } from "react-icons/fa";

export default function Policy() {
  return (
    <section className="my-16">
      <Container>
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          {data.map((data: any) => {
            return (
              <div
                className="card border border-solid py-6 px-4 flex items-center"
                key={data.id}
              >
                <div className="icon bg-color1 hover:bg-transparent border-2 border-solid border-color1 p-3 rounded-md text-color3 hover:text-color1 text-2xl">
                  {data.icon}
                </div>
                <div className="body ml-5">
                  <h3 className="text-lg">{data.name}</h3>
                  <p className="md:text-xs text-sm">{data.para}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

const data = [
  {
    id: 0,
    name: "Free Delivery",
    para: "Experience hassle-free delivery on all your orders.",
    icon: <FaShippingFast />,
  },
  {
    id: 1,
    name: "We are available 24/7",
    para: "Our customer support is available around the clock.",
    icon: <FaComment />,
  },
  {
    id: 2,
    name: "HAVE QUESTIONS?",
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
