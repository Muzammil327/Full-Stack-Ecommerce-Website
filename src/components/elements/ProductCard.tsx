import Link from "next/link";
import Image from "next/image";
import { ProductCardType } from "@/src/types/page";

interface IProps {
  product: ProductCardType;
}

export default function ProductCard({ product }: IProps) {
  return (
    <>
      <div className="card relative">
        <Link href={`/stores/${product.slug}`} className="relative">
          <div className="w-full md:h-[300px] h-[290px] relative overflow-hidden rounded-lg group-hover:opacity-75">
            <Image
              src={`${product.image}`}
              alt={product.name}
              title={product.name}
              sizes="(max-width: 500px) 90vw, 500px"
              height={500}
              width={500}
              className="w-full"
            />
          </div>
          <div className="md:mt-0 mt-4 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="mt-1 text-sm t1">{product.category}</span>
              <p className="text-sm font-medium text-gray-900">
                Rs.{product.price}
              </p>
            </div>
            <h3 className="md:text-lg text-base text-gray-700 product_description">
              <span aria-hidden="true" className="absolute inset-0"></span>
              {product.name}
            </h3>
          </div>
        </Link>
      </div>
    </>
  );
}
