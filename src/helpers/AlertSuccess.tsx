import { toast } from "react-toastify";

export default function AlertSuccess(text: string, colorMode:"dark" | "light") {
  return toast.success(text,{
        theme: colorMode,
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
}
