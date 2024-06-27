"use client";
import axios from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface ProductCardContextType {
  loading: boolean;
  error: string;
  data: any[];
  page: number;
  stats: number | undefined;
  fetchProduct: any;
  products: any;
  pagination: any;
  setPage: any;
  setHighPrice: (price: number | null) => void;
  setLowPrice: (price: number | null) => void;
  setPriceHL: (value: string) => void;
  setPriceLH: (value: string) => void;
  category: string;
  setCategory: (category: string) => void;
  subCategory: string;
  setSubCategory: (subCategory: string) => void;
  tags: string;
  setTags: (tags: string) => void;
  highPrice: number | null;
  lowPrice: number | null;
  priceLH: string;
  priceHL: string;
}

const ProductCardContext = createContext<ProductCardContextType | undefined>(
  undefined
);

interface ProductCardProviderProps {
  children: React.ReactNode;
}

export const ProductCardProvider: React.FC<ProductCardProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<[]>([]);
  const [pagination, setPagination] = useState();
  const [products, setProducts] = useState();
  const [stats, setStats] = useState();

  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [highPrice, setHighPrice] = useState<number | null>(null);
  const [lowPrice, setLowPrice] = useState<number | null>(null);
  const [priceHL, setPriceHL] = useState<string>("");
  const [priceLH, setPriceLH] = useState<string>("");

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKENDAPI}/api/product/get/productCard?page=${page}&category=${category}&subCatgeory=${subCategory}&lowPrice=${lowPrice}&highPrice=${highPrice}&lowToHigh=${priceLH}&highToLow=${priceHL}&tags=${tags}`
      );
      setData(response.data);
      setProducts(response.data.products);
      setPagination(response.data.pagination);
      setStats(response.data.pagination.totalResults);
    } catch (error) {
      console.log(error);
      setError("Error Store PRODUCTS");
    } finally {
      setLoading(false);
    }
  }, [
    category,
    subCategory,
    highPrice,
    lowPrice,
    page,
    priceHL,
    priceLH,
    tags,
  ]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <ProductCardContext.Provider
      value={{
        error,
        loading,
        stats,
        fetchProduct,
        pagination,
        products,
        data,
        page,
        setPage,
        setHighPrice,
        setLowPrice,
        setPriceHL,
        setPriceLH,
        category,
        setCategory,
        subCategory,
        setSubCategory,
        setTags,
        highPrice,
        lowPrice,
        tags,
        priceLH,
        priceHL,
      }}
    >
      {children}
    </ProductCardContext.Provider>
  );
};

// Create the useProductCard hook
export const useProductCard = (): ProductCardContextType => {
  const context = useContext(ProductCardContext);
  if (!context) {
    throw new Error(
      "useProductCard must be used within an ProductCardProvider"
    );
  }
  return context;
};
// const { error, loading, data } = useProductCard();
