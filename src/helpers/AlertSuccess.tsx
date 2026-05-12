import { toast } from "react-toastify";

export default function AlertSuccess(text: string, mode: string) {
  return toast.success(text,{
        theme: mode === 'dark' ? "dark" : "light",
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
}
