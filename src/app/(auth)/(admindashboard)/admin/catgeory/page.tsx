// "use client";
// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import style from "../form.module.css";
// import Image from "next/image";

// interface FormData {
//   name: string;
//   image: File | null;
//   description: string;
//   keyword: string[];
// }

// export default function Catgeory(props: { url: string }) {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const [data, setData] = useState<FormData>({
//     name: "",
//     image: null,
//     description: "",
//     keyword: [],
//   });
//   // image
//   const handleFileChange = (event: any) => {
//     setSelectedFile(event.target.files[0]);
//     setData({ ...data, image: event.target.files[0] }); // Update image in form data
//   };
//   // check box
//   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, checked } = event.target;
//     let updatedKeywords: string[];

//     if (checked) {
//       updatedKeywords = [...data.keyword, name];
//     } else {
//       updatedKeywords = data.keyword.filter((keyword) => keyword !== name);
//     }

//     setData({ ...data, keyword: updatedKeywords });
//   };
//   const keywords = ["comments", "candidates", "offers"]; // Example array of keywords

//   const SubmitHandle = async (e: any) => {
//     e.preventDefault();
//     const response = await axios.post(`/api/catgeory`, data);
//     try {
//       const res = await response.data;

//       if (res.error && res.error) {
//         toast.error(res.error);
//       } else {
//         toast.success(res.message);
//         setData({
//           name: "",
//           image: null,
//           description: "",
//           keyword: [],
//         });
//       }
//     } catch (error) {
//       toast.warning("Error during Catgeory Update");
//     }
//   };
//   return (
//     <div className="my-2">
//       <div className="mx-auto max-w-2xl text-center">
//         <h3 className="text-xl font-bold tracking-tight text-gray-900">
//           Add Catgeory Here
//         </h3>
//       </div>

//       <form className="mt-5 sm:mt-10" onSubmit={SubmitHandle}>
//         <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
//           <div>
//             <label htmlFor="catgeory-name" className={style.label}>
//               Catgeory Name
//             </label>
//             <div className="mt-2.5">
//               <input
//                 type="text"
//                 name="catgeory-name"
//                 id="catgeory-name"
//                 autoComplete="catgeory-name"
//                 className={style.input}
//                 value={data.name}
//                 onChange={(e) => setData({ ...data, name: e.target.value })}
//               />
//             </div>
//           </div>

//           <div className="col-span-full">
//             <label
//               htmlFor="cover-photo"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Category photo
//             </label>
//             <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
//               <div className="text-center">
//                 {!selectedFile && (
//                   <>
//                     <svg
//                       className="mx-auto h-12 w-12 text-gray-300"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                       aria-hidden="true"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     <div className="mt-4 flex text-sm leading-6 text-gray-600">
//                       <label
//                         htmlFor="file-upload"
//                         className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
//                       >
//                         <span>Upload a file</span>
//                         <input
//                           id="file-upload"
//                           name="file-upload"
//                           type="file"
//                           className="sr-only"
//                           onChange={handleFileChange}
//                         />
//                       </label>
//                       <p className="pl-1">or drag and drop</p>
//                     </div>
//                     <p className="text-xs leading-5 text-gray-600">
//                       PNG, JPG, GIF up to 10MB
//                     </p>
//                   </>
//                 )}

//                 {selectedFile && (
//                   <img src={URL.createObjectURL(selectedFile)} alt="Selected" />
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="sm:col-span-2">
//             <label htmlFor="description" className={style.label}>
//               Description
//             </label>
//             <div className="mt-2.5">
//               <textarea
//                 name="description"
//                 id="description"
//                 rows={4}
//                 maxLength={1000}
//                 className={style.input}
//                 value={data.description}
//                 onChange={(e) =>
//                   setData({ ...data, description: e.target.value })
//                 }
//               />
//             </div>
//           </div>

//           <fieldset>
//             <legend className="text-sm font-semibold leading-6 text-gray-900">
//               Keyword
//             </legend>
//             <div className="mt-6 grid grid-cols-3">
//               {keywords.map((keyword) => (
//                 <div key={keyword} className="relative flex gap-x-3">
//                   <div className="flex h-6 items-center">
//                     <input
//                       id={keyword}
//                       name={keyword}
//                       type="checkbox"
//                       className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
//                       onChange={handleCheckboxChange}
//                     />
//                   </div>
//                   <div className="text-sm leading-6">
//                     <label
//                       htmlFor={keyword}
//                       className="font-medium text-gray-900"
//                     >
//                       {keyword}
//                     </label>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </fieldset>

//           <button type="submit" className={`sm:col-span-2 ${style.btn}`}>
//             Submit Here
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import axios from "axios";
import style from "@/src/app/(auth)/form.module.css";

interface FormData {
  title: string;
}

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [catgeoryData, setCatgeoryData] = useState<FormData>({
    title: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/products/category", catgeoryData);
      const res = response.data;

      if (res.error) {
        setError(res.error);
      } else {
        setError(res.message);
        setCatgeoryData({ title: "" });
      }
    } catch (error) {
      setError("Error during Product Category Update");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="my-2">
      <div className="mx-auto max-w-2xl text-center">
        <h3 className="text-xl font-bold tracking-tight text-gray-900">
          Add Product Catgeory Here
        </h3>
      </div>

      <form className="mt-5 sm:mt-10" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="catgeory-name" className={style.label}>
              Catgeory Name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="catgeory-name"
                id="catgeory-name"
                autoComplete="catgeory-name"
                className={style.input}
                value={catgeoryData.title}
                onChange={(e) =>
                  setCatgeoryData({ ...catgeoryData, title: e.target.value })
                }
              />
            </div>
          </div>

          <button type="submit" className={`sm:col-span-2 ${style.btn}`}>
            {loading ? "Loading .." : "Submit Here"}
          </button>
        </div>
      </form>
    </div>
  );
}
