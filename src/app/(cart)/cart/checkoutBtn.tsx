import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { PENDINGORDER_API_Endpoint } from "@/src/utils/constant";
import { useAuth } from "@/src/components/contexts/authContext";
import Processing from "@/src/components/ui/Loading/Processing";

interface Product {
  product: string;
  qty: number;
}

const CheckoutBtn = ({ products }: { products: Product[] }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { session } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    const user = session.user._id;
    setLoading(true);
    try {
      // Post each product individually
      await Promise.all(
        products.map(async (product) => {
          await axios.post(`${PENDINGORDER_API_Endpoint}/post`, {
            product: product.product, // Send only the product ID
            qty: product.qty, // Send the quantity
            user,
          });
        })
      );
      router.push("/cart/checkout");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setError("Error adding product to cart. Please try again later.");
    } finally {
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
