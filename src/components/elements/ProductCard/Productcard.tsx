import Link from "next/link";
import { ProductCardType } from "@/src/types/page";
import ImageContainer from "../../ui/Image";
import { Links } from "../../ui/Typography";

interface IProps {
  product: ProductCardType;
  session: any;
}

export default function ProductCardElement({ product, session }: IProps) {
  return (
    <div className="card relative border rounded-md">
      <Links slug={`/stores/${product.slug}`} className="relative" title="product detail">
        <div className="w-full h-auto relative overflow-hidden rounded-lg group-hover:opacity-75">
          <ImageContainer
            src={`https://res.cloudinary.com/desggllml/image/upload/w_304,h_304,q_auto/${product.image}`}
            alt={product.name}
            sizes="(max-width: 400px) 180px, (min-width: 808px) 371px, (min-width: 1023px) 478px"
            height={304}
            width={304}
            className="object-cover object-center w-full h-full hover:scale-[1.5] duration-300 overflow-hidden"
          />
          <span className="md:block hidden mt-1 md:text-sm text-xs text-black font-sans capitalize absolute top-1 right-1 bg-white rounded-md px-2 py-1">
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
      </Links>
    </div>
  );
}
