import Link from "next/link";
import Image from "next/image";
interface ProductCardProps {
  _id: string;
  name: string;
  slug: string;
  image: string;
  category: string;
  price: number;
}

interface IProps {
  product: ProductCardProps;
}

export default function ProductCard({ product }: IProps) {
  return (
    <>
      <div className="card relative">
        <Link href={`/stores/${product.slug}`} className="relative">
          <div className="w-full aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
            <Image
              src={`https://res.cloudinary.com/desggllml/image/upload/v1714240538/${product.image}.png`}
              alt={product.name}
              title={product.name}
              sizes="(max-width: 600px) 90vw, 600px"
              height={1080}
              width={1080}
              className="w-full block h-auto object-cover"
            />
          </div>
          <div className="mt-4 flex flex-col">
            <div className="flex items-center justify-between">
              <p className="mt-1 text-sm text-gray-500">{product.category}</p>
              <p className="text-sm font-medium text-gray-900">
                Rs.{product.price}.00
              </p>
            </div>
            <h3 className="text-lg text-gray-700">
              <span aria-hidden="true" className="absolute inset-0"></span>
              {product.name}
            </h3>
          </div>
        </Link>
        {/* <div className="icon absolute flex justify-between top-2 left-2 items-center">
          <button className="bg-white md:h-10 h-8 md:w-10 w-8 rounded-full flex items-center justify-center">
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
          </button>
        </div>
        <div className="icon absolute flex justify-between top-2 right-2 items-center">
          <button
            className="bg-white md:h-10 h-8 md:w-10 w-8 rounded-full flex items-center justify-center"
            onClick={() => {
              if (product._id) {
                addToCart(product._id);
              }
            }}
          >
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
          </button>
        </div> */}
      </div>
    </>
  );
}
