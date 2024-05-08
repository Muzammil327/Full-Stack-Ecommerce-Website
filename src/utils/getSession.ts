import { useAuth } from "../components/context/authContext";

export async function GetSession() {
  const { session, status } = useAuth();

  if (session) {
    return session;
  } else {
    return null;
  }
}
