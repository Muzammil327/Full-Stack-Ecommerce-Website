import { LOGO_IMAGE, LOGO_TITLE } from "@/src/utils/constant";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="grid md:grid-cols-8">
        <div className="md:col-span-4">
          <Image
            src="https://res.cloudinary.com/duif39fso/image/upload/v1723610968/3_fuh9gb.jpg"
            alt={LOGO_TITLE}
            title={LOGO_TITLE}
            height={430}
            width={750}
            className="sm:h-screen h-60 w-full"
            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 750px"
            priority
          />
        </div>
        <div className="md:col-span-4 md:px-8 px-4 my-10">{children}</div>
      </div>
    </>
  );
}
