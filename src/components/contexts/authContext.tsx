"use client";
import { useSession } from "next-auth/react";
import React, { createContext, useContext } from "react";

// Define the type for the authentication context value
interface AuthContextType {
  session: any; // Modify "any" to match the actual type of session data
  status: string;
  user: string; // Add userId property
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the props interface for AuthProvider
interface AuthProviderProps {
  children: React.ReactNode;
}

// Create the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: session, status } = useSession();

  const user = session?.user?._id || "";
  return (
    <AuthContext.Provider value={{ session, status, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create the useAuth hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
// const { session, status, userId } = useAuth();
