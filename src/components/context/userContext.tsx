"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserData {
  email: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  zipCode: string;
  username: string;
}

// Define the type for the authentication context value
interface UserContextType {
  userProfile: any;
  isLoading: boolean;
  error: string;
}

// Create the authentication context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Define the props interface for UserProvider
interface UserProviderProps {
  children: React.ReactNode;
}

// Create the UserProvider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const { data: session } = useSession();

  const URL = process.env.NEXT_PUBLIC_BACKENDAPI;

  // ---------------------------------------------------------------------
  // -------------------------- GET API USER --------------------------
  // ---------------------------------------------------------------------
  const [userProfile, setUserProfile] = useState(null);

  const getUserProfile = useCallback(async () => {
    try {
      setIsLoading(true);

      if (session) {
        const response = await axios.get(
          `${URL}/api/get/user/${session.user._id}`
        );

        setUserProfile(response.data);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setError("Error fetching cart data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [session, URL]);

  // -------------------------------------------------------------------
  // -------------------------- POST API USER --------------------------
  // -------------------------------------------------------------------

  // ---------------------------------------------------------------------
  // -------------------------- DELETE API USER --------------------------
  // ---------------------------------------------------------------------

  // ---------------------------------------------------------------------
  // -------------------------- UPDATE API USER --------------------------
  // ---------------------------------------------------------------------

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  return (
    <UserContext.Provider value={{ userProfile, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};

// Create the useAuth hook
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within an UserProvider");
  }
  return context;
};
