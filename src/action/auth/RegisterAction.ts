import axios from "axios";
import { toast } from "react-toastify";
import { RegisterIprops } from "@/src/types/auth/page";

const REGISTER_API = "/api/auth/register"; // API endpoint

const RegisterAction = async (
  e: React.FormEvent<HTMLFormElement>,
  data: RegisterIprops,
  setLoading: (loading: boolean) => void,
  setData: (data: RegisterIprops) => void,
  router: any
) => {
  e.preventDefault(); // Prevent form submission
  setLoading(true);

  try {
    const response = await axios.post(`${REGISTER_API}`, data);
    if (response.data.statusbar === 400) {
      toast.error(response.data.error);
    } else {
      setData({
        username: "",
        email: "",
        password: "",
      });
      toast.success("Plz Sign In with your Email");
      router.push("/sign-in");
    }
  } catch (error) {
    console.error("An error occurred during registration:", error);
  } finally {
    setLoading(false);
  }
};
export default RegisterAction;
