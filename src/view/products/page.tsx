// "use client";
// import Container from "@/components/element/container/page";
// import ProductCard from "@/components/product/card/page";
// import React, { useEffect, useState } from "react";
// import { ProducTypes } from "@/components/product/card/type";
// import LeftCatgeory from "./leftCatgeory";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// const products: ProducTypes[] = [
//   {
//     id: 0,
//     name: "Basic Tee",
//     href: "/details",
//     imageSrc: "/2.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: 45,
//     cat: "Men",
//   },
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "/details",
//     imageSrc: "/2.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: 45,
//     cat: "Accessories",
//   },
//   {
//     id: 2,
//     name: "Basic Tee",
//     href: "/details",
//     imageSrc: "/2.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: 45,
//     cat: "Accessories",
//   },
//   {
//     id: 3,
//     name: "Basic Tee",
//     href: "/details",
//     imageSrc: "/2.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: 45,
//     cat: "Women",
//   },
//   {
//     id: 4,
//     name: "Basic Tee",
//     href: "/details",
//     imageSrc: "/2.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: 45,
//     cat: "Men",
//   },
//   {
//     id: 5,
//     name: "Basic Tee",
//     href: "/details",
//     imageSrc: "/2.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: 45,
//     cat: "Accessories",
//   },
//   {
//     id: 6,
//     name: "Basic Tee",
//     href: "/details",
//     imageSrc: "/2.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: 45,
//     cat: "Women",
//   },
//   {
//     id: 7,
//     name: "Basic Tee",
//     href: "/details",
//     imageSrc: "/2.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: 45,
//     cat: "Women",
//   },
// ];

// export default function ProductPage() {
//   const [filteredProducts, setFilteredProducts] = useState(products);

//   const [fetchCat, setFetchCat] = useState([]);
//   const filterProductsByCategory = (category: string) => {
//     const filtered = fetchCat.filter((product) => product.name === category);
//     setFilteredProducts(filtered);
//   };
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const router = useRouter();
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("/api/products");

//         setFetchCat(response.data.catgeoryProduct);
//       } catch (error) {
//         setError("Error fetching categories");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCategories();
//   }, []);
//   return (
//     <Container>
//       <div className="grid md:grid-cols-10 gap-4 my-12">
//         <div className="col-span-2">
//           <LeftCatgeory filterItem={filterProductsByCategory} />

//           {/* <div className="filter-widget mb-10">
//             <h4 className="mb-4 font-bold text-xl text-slate-800">Brand</h4>
//             <div className="bc-item">
//               <label htmlFor="" className="flex items-center gap-3">
//                 <input type="checkbox" id="bc-calvin" className="h-4 w-4" />
//                 <span className="text-gray-800">Calvin Klein</span>
//               </label>
//             </div>
//           </div> */}
//         </div>
//         <div className="col-span-8">
//           <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
//             {/* {filteredProducts.map((data: ProducTypes) => (
//               <> */}
//                 {/* <ProductCard product={data} key={data.id} /> */}
//                 {fetchCat.map((data: any) => (
//                   <div key={data._id}>
//                     <h1>{data.name}</h1>
//                     <h1>{data.basePrice}</h1>
//                     {/* <button onClick={() => addToCart(data._id)}>
//                       Add to Cart
//                     </button> */}
//                     {/* <ProductCard product={data} key={data.id} /> */}
//                   </div>
//                 ))}
//               {/* </>
//             ))} */}
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// }
import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
