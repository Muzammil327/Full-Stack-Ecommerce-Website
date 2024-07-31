import React from "react";
import { PaginationProps } from "@/src/types/product";
import Button from "@/src/components/ui/Button";

export default function Pagination({
  pagination,
  setPage,
  page,
  loading,
}: {
  pagination: PaginationProps | undefined;
  setPage: any;
  page: any;
  loading: any;
}) {
  const handleLoadMore = () => {
    if (pagination && page < pagination.totalPages) {
      setPage((prevPage: any) => prevPage + 1);
    }
  };
  return (
    <div className="my-5">
      {pagination && page < pagination.totalPages && (
        <Button
          onClick={handleLoadMore}
          className="button_outline rounded-md px-6 py-2 flex items-center mx-auto"
          title="load more button"
        >
          {loading ? "Loading..." : "Load More"}
        </Button>
      )}
    </div>
  );
}
