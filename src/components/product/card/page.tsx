import Link from "next/link";
import { ProducTypes } from "./type";
import Image from "next/image";

interface IProps {
  product: ProducTypes;
}

export default function ProductCard({ product }: IProps) {
  return (
    <>
      <div className="card relative">
        <Link href={product.href}>
          <div className="image relative">
            <Image
              src={product.imageSrc}
              alt={product.imageAlt}
              title={product.imageAlt}
              sizes="(max-width: 600px) 90vw, 600px"
              height={1600}
              width={1216}
              className="w-full block h-auto"
            />
            <div className="pt-4">
              <span className="text-gray-600">{product.cat}</span>

              <h3 className="text-black text-lg font-semibold py-[2px] overflow-hidden line-clamp-2">
                {product.name}
              </h3>
              <span className="text-black">Rs.{product.price}.00</span>
            </div>
          </div>
        </Link>
        <div className="icon absolute flex justify-between top-2 left-2 items-center">
          <span className="bg-white md:h-10 h-8 md:w-10 w-8 rounded-full flex items-center justify-center">
            <svg
              fill="#000000"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              id="favourite"
              data-name="Line Color"
              xmlns="http://www.w3.org/2000/svg"
              className="icon line-color"
            >
              <path
                id="primary"
                d="M19.57,5.44a4.91,4.91,0,0,1,0,6.93L12,20,4.43,12.37A4.91,4.91,0,0,1,7.87,4a4.9,4.9,0,0,1,3.44,1.44,4.46,4.46,0,0,1,.69.88,4.46,4.46,0,0,1,.69-.88,4.83,4.83,0,0,1,6.88,0Z"
              ></path>
            </svg>
          </span>
        </div>
        <div className="icon absolute flex justify-between top-2 right-2 items-center">
          <span className="bg-white md:h-10 h-8 md:w-10 w-8 rounded-full flex items-center justify-center">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0" fill="none" width="20" height="20" />

              <g>
                <path d="M6 13h9c.55 0 1 .45 1 1s-.45 1-1 1H5c-.55 0-1-.45-1-1V4H2c-.55 0-1-.45-1-1s.45-1 1-1h3c.55 0 1 .45 1 1v2h13l-4 7H6v1zm-.5 3c.83 0 1.5.67 1.5 1.5S6.33 19 5.5 19 4 18.33 4 17.5 4.67 16 5.5 16zm9 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z" />
              </g>
            </svg>
          </span>
        </div>
      </div>
    </>
  );
}
