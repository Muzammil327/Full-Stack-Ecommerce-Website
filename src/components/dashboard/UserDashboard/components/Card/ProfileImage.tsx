// "use client";
// import { ChangeEvent, FormEvent, useState } from "react";
// import Image from "next/image"; // Assuming you're using Next.js Image component
// import Button from "@/src/components/ui/Button";
// import axios from "axios";
// import { useSession } from "next-auth/react";

// export default function ProfileCard({ userImage }: any) {
//   // const [image, setImage] = useState("/hero_img.jpg"); // Default image path
//   const [loadings, setLoading] = useState<boolean>(false);
//   const { data: session } = useSession();
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   const handleUploadClick = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const formData = new FormData();

//       if (image) {
//         formData.append("image", image);
//       }
//       const userId = session?.user._id;
//       await axios.put(
//         `http://localhost:5000/api/user/update/image/${userId}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       // Assuming you get a URL or path back from your upload process
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const [image, setImage] = useState<File | null>(null);

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     if (selectedFile) {
//       setImage(selectedFile);
//       const url = URL.createObjectURL(selectedFile);
//       setImageUrl(url);
//     }
//   };

//   return (
//     <form
//       className="relative my-4 flex justify-between items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
//       onSubmit={handleUploadClick}
//     >
//       <div>
//         <>
//           {userImage && (
//             <Image
//               src={
//                 "" ||
//                 `http://localhost:5000/public/user_image/${encodeURIComponent(
//                   userImage.image
//                 )}`
//               }
//               alt="Selected Image"
//               className="text-center h-[100px] w-[100px]"
//               height={100}
//               width={100}
//             />
//           )}
//         </>
//         {imageUrl ? (
//           <Image
//             src={imageUrl}
//             alt="Selected Image"
//             className="text-center h-[100px] w-[100px]"
//             height={100}
//             width={100}
//           />
//         ) : (
//           <>
//             <svg
//               className="mx-auto h-12 w-12 text-gray-300"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//               aria-hidden="true"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <div className="mt-4 flex text-sm leading-6 text-gray-600">
//               <label
//                 htmlFor="image"
//                 className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
//               >
//                 <span>Upload a Image</span>
//                 <input
//                   id="image"
//                   name="image"
//                   type="file"
//                   className="sr-only"
//                   onChange={handleImageChange}
//                 />
//               </label>
//             </div>
//           </>
//         )}
//       </div>
//       <Button className="button_bg w-40">
//         {loadings ? "Submitting..." : "Upload Image "}
//       </Button>
//     </form>
//   );
// }
"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image"; // Assuming you're using Next.js Image component
import Button from "@/src/components/ui/Loading/Buttons";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function ProfileCard({ userImage }: any) {
  const { data: session } = useSession();
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUploadClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      if (image) {
        formData.append("image", image);
      }
      const userId = session?.user._id;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKENDAPI}/api/user/update/image/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageUrl(response.data.user.image); // Assuming the response contains the updated user data
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImage(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setImageUrl(url);
    }
  };

  return (
    <form
      className="relative my-4 flex justify-between items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-4"
      onSubmit={handleUploadClick}
    >
      <div>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Selected Image"
            className="text-center h-[100px] w-[100px]"
            height={100}
            width={100}
          />
        ) : userImage && userImage.image ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKENDAPI}/public/user_image/${userImage.image}`}
            alt="User Image"
            className="text-center h-[100px] w-[100px] rounded-md"
            height={100}
            width={100}
          />
        ) : (
          <>
            <svg
              className="mx-auto h-12 w-12 text-gray-300"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                clipRule="evenodd"
              />
            </svg>
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="image"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload an Image</span>
                <input
                  id="image"
                  name="image"
                  type="file"
                  className="sr-only"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </>
        )}
      </div>
      <Button className="button_bg w-40">
        {loading ? "Submitting..." : "Upload Image"}
      </Button>
    </form>
  );
}
