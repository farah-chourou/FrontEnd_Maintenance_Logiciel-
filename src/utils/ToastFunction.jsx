import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaostSuccess = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const TaostLoading = (message) => {
  toast.loading(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const Toastfunction = { TaostSuccess, TaostLoading };
export default Toastfunction;
