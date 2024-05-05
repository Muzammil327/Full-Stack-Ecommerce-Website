"use client";
import React, { createContext, useContext, useState } from "react";

// Define the type for the authentication context value
interface CartTestContextType {
  setCartBuy: any; // Modify "any" to match the actual type of session data
  cartBuy: any;
}

// Create the authentication context
const CartTestContext = createContext<CartTestContextType | undefined>(
  undefined
);

// Define the props interface for CartTestProvider
interface CartTestProviderProps {
  children: React.ReactNode;
}

// Create the CartTestProvider component
export const CartTestProvider: React.FC<CartTestProviderProps> = ({
  children,
}) => {
  const [cartBuy, setCartBuy] = useState<[]>([]);

  return (
    <CartTestContext.Provider value={{ cartBuy, setCartBuy }}>
      {children}
    </CartTestContext.Provider>
  );
};

// Create the useAuth hook
export const useCartTest = (): CartTestContextType => {
  const context = useContext(CartTestContext);
  if (!context) {
    throw new Error("useAuth must be used within an CartTestProvider");
  }
  return context;
};
