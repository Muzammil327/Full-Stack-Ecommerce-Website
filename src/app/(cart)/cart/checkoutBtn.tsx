import React, { useState } from "react";
import { useAuth } from "@/src/components/context/authContext";
import { useRouter } from "next/navigation";

interface CartItem2 {
  quantity: number;
  product: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };
}

const CheckoutBtn = ({ cart }: { cart: CartItem2[] }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false); // Initialize loading state to false
  const { session } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    if (session) {
      setIsLoading(true); // Set loading state to true when submitting
      const user = session.user._id;
      try {
        // Simulate adding to pending order (Replace with actual API call)
        // await addToPendingOrder(cart, user);
        alert(`${user.name}`);
      } catch (error) {
        console.error("Error adding to pending order:", error);
      } finally {
        setIsLoading(false); // Reset loading state if there's an error
      }
    } else {
      alert("Please Login");
    }
  };

  return (
    <button
      className="py-3 mt-6 px-16 bg-red-500 border border-solid border-red-500 hover:bg-white hover:text-red-500 text-white rounded-md block w-full text-lg font-semibold transition-all hover:transition-all"
      onClick={handleSubmit}
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : "Proceed to Checkout"}
    </button>
  );
};

export default CheckoutBtn;
