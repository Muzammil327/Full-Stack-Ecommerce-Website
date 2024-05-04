import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="">
        <button>
          {" "}
          <Link
            href="/admin/product/add"
            className="bg-red-500 hover:bg-red-600 transition-all text-white py-3 px-8 my-3 rounded-md"
          >
            Add New Product
          </Link>
        </button>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 whitespace-nowrap">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Sub category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Discount Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Weight
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro 17
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">Yes</td>
                <td className="px-6 py-4">Yes</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">3.0 lb.</td>
                <td className="flex items-center px-6 py-4 whitespace-nowrap">
                  <a
                    href={`/admin/product/Slider/fhgfh`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline ms-3"
                  >
                    Edit Slider
                  </a>
                  <a
                    href={`/admin/product/put/fhgfh`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline ms-3"
                  >
                    Edit Remaining
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    Remove
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">White</td>
                <td className="px-6 py-4">Laptop PC</td>
                <td className="px-6 py-4">No</td>
                <td className="px-6 py-4">Yes</td>
                <td className="px-6 py-4">$1999</td>
                <td className="px-6 py-4">1.0 lb.</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    Remove
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic Mouse 2
                </th>
                <td className="px-6 py-4">Black</td>
                <td className="px-6 py-4">Accessories</td>
                <td className="px-6 py-4">Yes</td>
                <td className="px-6 py-4">No</td>
                <td className="px-6 py-4">$99</td>
                <td className="px-6 py-4">0.2 lb.</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    Remove
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple Watch
                </th>
                <td className="px-6 py-4">Black</td>
                <td className="px-6 py-4">Watches</td>
                <td className="px-6 py-4">Yes</td>
                <td className="px-6 py-4">No</td>
                <td className="px-6 py-4">$199</td>
                <td className="px-6 py-4">0.12 lb.</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    Remove
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple iMac
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">PC</td>
                <td className="px-6 py-4">Yes</td>
                <td className="px-6 py-4">Yes</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">7.0 lb.</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    Remove
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple AirPods
                </th>
                <td className="px-6 py-4">White</td>
                <td className="px-6 py-4">Accessories</td>
                <td className="px-6 py-4">No</td>
                <td className="px-6 py-4">Yes</td>
                <td className="px-6 py-4">$399</td>
                <td className="px-6 py-4">38 g</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    Remove
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  iPad Pro
                </th>
                <td className="px-6 py-4">Gold</td>
                <td className="px-6 py-4">Tablet</td>
                <td className="px-6 py-4">No</td>
                <td className="px-6 py-4">Yes</td>
                <td className="px-6 py-4">$699</td>
                <td className="px-6 py-4">1.3 lb.</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    Remove
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic Keyboard
                </th>
                <td className="px-6 py-4">Black</td>
                <td className="px-6 py-4">Accessories</td>
                <td className="px-6 py-4">Yes</td>
                <td className="px-6 py-4">Yes</td>
                <td className="px-6 py-4">$99</td>
                <td className="px-6 py-4">453 g</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    Remove
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple TV 4K
                </th>
                <td className="px-6 py-4">Black</td>
                <td className="px-6 py-4">TV</td>
                <td className="px-6 py-4">Yes</td>
                <td className="px-6 py-4">No</td>
                <td className="px-6 py-4">$179</td>
                <td className="px-6 py-4">1.78 lb.</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    Remove
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  AirTag
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Accessories</td>
                <td className="px-6 py-4">Yes</td>
                <td className="px-6 py-4">No</td>
                <td className="px-6 py-4">$29</td>
                <td className="px-6 py-4">53 g</td>
                <td className="flex items-center px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    Remove
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="pagination mt-4">
          <ul className="flex items-center gap-2">
            <li className="bg-red-400 h-8 w-8 flex items-center justify-center text-white rounded-md">
              1
            </li>
            <li className="bg-red-400 h-8 w-8 flex items-center justify-center text-white rounded-md">
              2
            </li>
            <li className="bg-red-400 h-8 w-8 flex items-center justify-center text-white rounded-md">
              3
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
