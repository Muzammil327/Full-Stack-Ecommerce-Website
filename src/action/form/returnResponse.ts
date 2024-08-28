import axios from "axios";
import { toast } from "react-toastify";

const REGISTER_API = "/api/form/returnReplace"; // API endpoint

const ReturnReplaceAction = async (
  e: React.FormEvent<HTMLFormElement>,
  data: any,
  setLoading: (loading: boolean) => void,
  setData: (data: any) => void,
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
        userName: "",
        contactNumber: "",
        returnReason: "",
        productCondition: "",
      });
      toast.success(response.data.message);
      router.push(`/dashboard/active-order/${data.orderId}/success-message`);
    }
  } catch (error) {
    console.error("An error occurred during registration:", error);
  } finally {
    setLoading(false);
  }
};
export default ReturnReplaceAction;
