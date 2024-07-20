import Link from "next/link";
import { ProductCardType } from "@/src/types/page";
import ImageContainer from "../ui/Image";

interface IProps {
  product: ProductCardType;
}

export default function ProductCard({ product }: IProps) {
  return (
    <>
      <div className="card relative">
        <Link href={`/stores/${product.slug}`} className="relative">
          <div className="w-full h-auto relative overflow-hidden rounded-lg group-hover:opacity-75">
            <ImageContainer
              src={product.image}
              alt={product.name}
              sizes="(max-width: 500px) 90vw, 500px"
              height={500}
              width={500}
              className="object-cover object-center w-full h-full"
            />
          </div>

          <div className="md:mt-0 mt-4 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="mt-1 text-sm text-color1 font-sans">{product.category}</span>
              <p className="text-sm font- text-gray-900 font-sans">
                Rs.{product.price}
              </p>
            </div>
            <h3 className="md:text-lg text-base text-gray-700 product_description font-sans">
              {product.name}
            </h3>
          </div>
        </Link>
      </div>
    </>
  );
}
