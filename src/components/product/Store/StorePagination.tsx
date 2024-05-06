import React from "react";

export default function StorePagination({ setPage, data }: any) {
  const handleLoadMore = () => {
    setPage((prevPage: number) => prevPage + 1);
  };

  const { startResult, endResult, totalResults } = data.pagination;

  return (
    <div className="flex items-center md:justify-between border-t border-gray-200 bg-white py-3 mt-4">
      <div className="flex md:flex-row flex-col sm:flex-1 items-center md:justify-between justify-center">
        <div className="mb-2">
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium px-1">{startResult}</span>
            to
            <span className="font-medium px-1">{endResult}</span>
            of
            <span className="font-medium px-1">{totalResults}</span>
            results
          </p>
        </div>
        <div>
          {data.products.length === 6 && (
            <button
              onClick={handleLoadMore}
              className="bg-red-400 mx-auto my-4 py-1 px-4 text-white flex items-center justify-center"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
