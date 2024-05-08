import React, { useState } from "react";
import { useAuth } from "@/src/components/context/authContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import Processing from "@/src/components/element/Loading/Processing";
import { PENDINGORDER_API_Endpoint } from "@/src/utils/constant";

interface CartItem2 {
  quantity: number;
  product: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };
}

const CheckoutBtn = ({ cartBuy }: { cartBuy: CartItem2[] }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { session } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    const userId = session.user._id;
    setLoading(true);
    try {
      await axios.post(`${PENDINGORDER_API_Endpoint}/post`, {
        cartBuy,
        userId,
      });
      router.push("/cart/checkout");
      setLoading(false);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setError("Error adding product to cart. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <button className="btn" onClick={handleSubmit} disabled={loading}>
      {loading ? <Processing /> : "Proceed to Checkout"}
    </button>
  );
};

export default CheckoutBtn;

// const [isLoading, setIsLoading] = useState<boolean>(true);
// const [error, setError] = useState<string>("");
// const { session } = useAuth();

// const handleSubmit = async () => {
//   setIsLoading(true); // Set loading state to true when submitting
//   const userId = session.user._id;
//   try {
//     await axios.post(
//       `${process.env.NEXT_PUBLIC_BACKENDAPI}/api/post/pendingOrder`,
//       {
//         cartBuy,
//         userId,
//       }
//     );
//     setIsLoading(false);
//   } catch (error) {
//     console.error("Error adding product to cart:", error);
//     setError("Error adding product to cart. Please try again later.");
//   } finally {
//     setIsLoading(false);
//   }
// };
