import Link from "next/link";
import { ProductCardType } from "@/src/types/page";
import ImageContainer from "../../ui/Image";

interface IProps {
  product: ProductCardType;
  session: any;
}

export default function ProductCardElement({ product, session }: IProps) {
  return (
    <div className="card relative border rounded-md">
      <Link href={`/stores/${product.slug}`} className="relative">
        <div className="w-full h-auto relative overflow-hidden rounded-lg group-hover:opacity-75">
          <ImageContainer
            src={`https://res.cloudinary.com/desggllml/image/upload/w_500,h_500,c_fill,g_center/${product.image}`}
            alt={product.name}
            sizes="(max-width: 500px) 90vw, 500px"
            height={500}
            width={500}
            className="object-cover object-center w-full h-full hover:scale-[1.5] duration-300 overflow-hidden"
          />
          <span className="mt-1 text-sm text-black font-sans capitalize absolute top-1 left-2 bg-white rounded-md px-2 py-1">
            {product.cat.map((data: any) => data.name)}
          </span>
        </div>

        <div className="md:mt-0 mt-4 flex flex-col p-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-900 font-sans line-through">
              Rs.
              {product.price}
            </p>
            <p className="text-sm text-gray-900 font-sans">
              Rs.
              {product.dPrice}
            </p>
          </div>
          <h3 className="md:text-lg text-base text-gray-700 capitalize product_description font-sans mt-1">
            {product.name}
          </h3>
        </div>
      </Link>
    </div>
  );
}
