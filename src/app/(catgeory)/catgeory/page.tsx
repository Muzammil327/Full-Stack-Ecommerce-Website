import Container from "@/src/components/ui/Container";
import { Heading1 } from "@/src/components/ui/Typography";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main className="wrapper">
      <section className="hero bg-slate-200 py-40 flex items-center justify-center content">
        <Heading1 className="capitalize" title="Catgeory" />
      </section>
      <section className="my-20">
        <Container>
          <div className="grid grid-cols-3 gap-4">
            {data.map((data) => {
              return (
                <div
                  className="flex items-center justify-center bg-gray-100"
                  key={data.id}
                >
                  <div className="relative group">
                    <img
                      src={data.image}
                      alt="Sample Image"
                      className="w-full h-auto group-hover:blur-lg transition duration-300 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
                      <Link
                        href={data.slug}
                        className="text-xl text-white font-semibold flex items-center justify-center absolute left-5 bottom-5"
                      >
                        {data.name}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}

const data = [
  {
    id: 0,
    name: "Shoes Acessories",
    image:
      "https://cdn.thewirecutter.com/wp-content/media/2024/05/runningshoesforyou-2048px-2251.jpg?auto=webp&quality=75&width=1024",
    slug: "/catgeory/shoe-collection/",
  },
];
