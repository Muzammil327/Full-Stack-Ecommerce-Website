import React from "react";
import Button from "@/src/components/ui/Button";

export default function Pagination({
  pagination,
  setPage,
  page,
  loading,
}: {
  pagination: any;
  setPage: any;
  page: any;
  loading: any;
}) {
  const handleNextPage = () => {
    if (pagination?.currentPage < pagination?.totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagination?.currentPage > 1) {
      setPage(page - 1);
    }
  };
  return (
    <div>
      {loading ? (
        <p>Loading pagination...</p>
      ) : (
        <>
          <div className="flex md:flex-row flex-col items-center justify-center mt-8 gap-4">
            <Button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="button_bg !px-12"
              title="load more button"
            >
              Previous
            </Button>
            <span>
              Page {pagination?.currentPage} of {pagination?.totalPages} - ({pagination.totalResults})
            </span>
            <Button
              onClick={handleNextPage}
              disabled={page >= pagination.totalPages}
              className="button_bg !px-12"
              title="load more button"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
