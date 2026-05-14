import { toast } from "react-toastify";

export function AlertError(text: string, colorMode:"dark" | "light") {
  return toast.error(text,{
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
