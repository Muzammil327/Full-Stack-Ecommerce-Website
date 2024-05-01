import React from "react";

export default function LeftCatgeory({ filterItem }: any) {
  const menuItems = data.map((item) => item.title);

  return (
    <>
      <div className="filter-widget mb-10">
        <h4 className="mb-4 font-bold text-xl text-slate-800">Categories</h4>
        <ul className="filter-catagories">
          {menuItems.map((data, index) => {
            return (
              <>
                <li key={index}>
                  <button
                    className="text-slate-500 my-2 inline-block"
                    onClick={() => filterItem(data)}
                  >
                    {data}
                  </button>
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
}

const data = [
  {
    id: 0,
    title: "Men",
  },
  {
    id: 1,
    title: "Women",
  },
  {
    id: 2,
    title: "Kids",
  },
  {
    id: 3,
    title: "products 5",
  },
];
