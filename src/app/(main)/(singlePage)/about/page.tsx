import Container from "@/src/components/ui/Container";
import { Heading1 } from "@/src/components/ui/Typography";
import React from "react";

export default function page() {
  return (
    <main className="wrapper">
      <section className="hero bg-slate-200 py-40 flex items-center justify-center content">
        <Heading1 className="capitalize" title="About Our Shop" />
      </section>
      <section className="my-20">
        <Container>
          <div className="">
            <p className="pt-6 tracking-wider leading-8">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum,
              maiores odio vel debitis cupiditate officia, nobis adipisci hic
              sapiente, magni iusto unde placeat laborum dolor nulla qui rem
              ipsum delectus nam recusandae molestiae ratione saepe quod!
              Voluptatibus nobis, est pariatur velit ullam dolorem enim sed
              quisquam quasi voluptate maxime ratione! Lorem ipsum dolor, sit
              amet consectetur adipisicing elit. Rerum, maiores odio vel debitis
              cupiditate officia, nobis adipisci hic sapiente, magni iusto unde
              placeat laborum dolor nulla qui rem ipsum delectus nam recusandae
              molestiae ratione saepe quod! Voluptatibus nobis, est pariatur
              velit ullam dolorem enim sed quisquam quasi voluptate maxime
              ratione!
            </p>
            <p className="pt-6 tracking-wider leading-8">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum,
              maiores odio vel debitis cupiditate officia, nobis adipisci hic
              sapiente, magni iusto unde placeat laborum dolor nulla qui rem
              ipsum delectus nam recusandae molestiae ratione saepe quod!
              Voluptatibus nobis, est pariatur velit ullam dolorem enim sed
              quisquam quasi voluptate maxime ratione!
            </p>
            <p className="pt-6 tracking-wider leading-8">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum,
              maiores odio vel debitis cupiditate officia, nobis adipisci hic
              sapiente, magni iusto unde placeat laborum dolor nulla qui rem
              ipsum delectus nam recusandae molestiae ratione saepe quod!
              Voluptatibus nobis, est pariatur velit ullam dolorem enim sed
              quisquam quasi voluptate maxime ratione! Lorem ipsum dolor, sit
              amet consectetur adipisicing elit. Rerum, maiores odio vel debitis
              cupiditate officia, nobis adipisci hic sapiente, magni iusto unde
              placeat laborum dolor nulla qui rem ipsum delectus nam recusandae
              molestiae ratione saepe quod! Voluptatibus nobis, est pariatur
              velit ullam dolorem enim sed quisquam quasi voluptate maxime
              ratione!
            </p>
            <p className="pt-6 tracking-wider leading-8">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum,
              maiores odio vel debitis cupiditate officia, nobis adipisci hic
              sapiente, magni iusto unde placeat laborum dolor nulla qui rem
              ipsum delectus nam recusandae molestiae ratione saepe quod!
              Voluptatibus nobis, est pariatur velit ullam dolorem enim sed
              quisquam quasi voluptate maxime ratione!
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
