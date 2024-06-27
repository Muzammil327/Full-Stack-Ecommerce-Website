'use client'
import Image from "next/image";
import Link from "next/link";
import Container from "@/src/components/ui/Container";
import LoadingCart from "@/src/components/ui/Loading/LoadingCart";
import { useWishlist } from "@/src/components/context/wishlistContext";

const WishlistView = () => {
  const { isFetchingWishList, wishList, DeleteHandle } = useWishlist();

  return (
    <>
      <Container>
        <div className="my-20">
          <div className="relative overflow-x-auto sm:rounded-lg mb-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              {isFetchingWishList ? (
                <>
                  <LoadingCart />
                  <LoadingCart />
                  <LoadingCart />
                  <LoadingCart />
                </>
              ) : (
                <>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="md:px-6 px-2 py-3">
                        <span className="sr-only">Image</span>
                        Image
                      </th>
                      <th scope="col" className="md:px-6 px-2 py-3">
                        Name
                      </th>
                      <th scope="col" className="md:px-6 px-2 py-3">
                        Price
                      </th>
                      <th scope="col" className="md:px-6 px-2 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishList ? ( // Check if userData is not null before rendering
                      wishList.map((user, index) => (
                        <tr
                          className="bg-white border-b hover:bg-gray-50"
                          key={index}
                        >
                          <td className="md:px-6 px-2 py-2">
                            <Image
                              src={user.product_Detail.image}
                              alt={user.product_Detail.name}
                              title={user.product_Detail.name}
                              height={1080}
                              width={1080}
                              className="h-20 w-20 mx-auto"
                              objectFit="cover"
                            />
                          </td>
                          <td className="md:px-6 px-2 py-4 font-semibold text-gray-900">
                            <Link href={`/stores/${user.product_Detail.slug}`}>
                              {user.product_Detail.name}
                            </Link>
                          </td>
                          <td className="md:px-6 px-2 py-4 font-semibold text-gray-900">
                            {user.product_Detail.price -
                              user.product_Detail.discountprice}
                          </td>
                          <td className="md:px-6 px-2 py-4">
                            <button
                              className="font-medium t1 hover:underline"
                              onClick={() => DeleteHandle(user._id)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <p>NO user WishList...</p>
                    )}
                  </tbody>
                </>
              )}
            </table>
          </div>
        </div>
      </Container>
    </>
  );
};

export default WishlistView;
