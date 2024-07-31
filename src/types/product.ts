export interface UserProductCardProps {
  _id: string;
  name: string;
  slug: string;
  image: string;
  category: string;
  price: number;
  dPrice: number;
}

export interface AdminProductCardProps {
  _id: string;
  name: string;
  slug: string;
  image: string;
  category: string;
  price: number;
  dPrice: number;

  slider: [];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  limit: number;
}
