import { toast } from "react-toastify";
import { LoginIprops } from "@/src/types/auth/page";
import { signIn } from "next-auth/react";

export const LoginAction = async (
  e: React.FormEvent<HTMLFormElement>,
  data: LoginIprops,
  setLoading: (loading: boolean) => void,
  router: any
) => {
  e.preventDefault(); // Prevent form submission
  setLoading(true);

  if (!data.email || !data.password) {
    setLoading(false);
    return toast.error("Email and password are required.");
  }

  try {
    const response = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (response?.error) {
      toast.error("Credential Failed");
    }
    router.push("/dashboard");
    window.location.reload();
  } catch (error) {
    toast.warning("Internal server Error.");
  }
};
