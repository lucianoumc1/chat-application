import { toast } from "react-toastify";

export const useErrorHandler = (msg) => {
  toast.error(msg, {
    autoClose: 3000,
    hideProgressBar: true,
    style: { fontSize: "1.4rem" },
  });
};
