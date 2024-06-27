import Link from "next/link";
import Image from "next/image";
export interface ProductCardProps {
  _id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  discountprice: number;
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
              src={`${product.image}`}
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
                Rs.{product.price - product.discountprice}.00
              </p>
            </div>
            <h3 className="md:text-lg text-base text-gray-700">
              <span aria-hidden="true" className="absolute inset-0"></span>
              {product.name}
            </h3>
          </div>
        </Link>
      </div>
    </>
  );
}
