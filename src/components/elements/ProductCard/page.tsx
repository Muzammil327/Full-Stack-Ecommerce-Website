import { ProductCardType } from "@/src/types/page";
import ProductCardElement from "./Productcard";

interface IProps {
  product: ProductCardType;
  userId: any;
}

export default function ProductCard({ product, userId }: IProps) {

  return <ProductCardElement product={product} session={userId} />;
}
