import { Dialog, DialogTitle, IconButton, Slide, type Transitions } from "@mui/material";
import { forwardRef, type ReactElement, type ReactNode, type Ref } from "react";
import { Close } from "@mui/icons-material";
import { useColorStore } from "../store/useColorStore";

type ActionButton = {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

type AppDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
  cancelButton?: ActionButton;
  confirmButton?: ActionButton & { variant?: "danger" | "primary" };
  maxWidth?: "xs" | "sm" | "md" | "lg";
};

const Transition = forwardRef(function Transition(
  props: Transitions & { children: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AppDialog({
  open,
  onClose,
  title,
  children,
  cancelButton,
  confirmButton,
  maxWidth = "sm",
}: AppDialogProps) {
  const { colors } = useColorStore();

  const hasActions = cancelButton || confirmButton;

  const confirmColorClass =
    confirmButton?.variant === "danger"
      ? "bg-red-500 hover:bg-red-600 focus:ring-red-500/30"
      : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500/30";

  return (
    <Dialog
      open={open}
      slots={{ transition: Transition }}
      keepMounted
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor:
            colors.mode === "dark" ? colors.primary[800] : colors.primary[100],
          color: colors.letters,
          borderRadius: "12px",
        },
        '& .text-text-color': {
          color: colors.letters,
        },
      }}
    >
      <div className="relative p-6">
        <IconButton
          aria-label="close"
          onClick={onClose}
          size="small"
          className="absolute! right-3 top-3 text-slate-400! hover:text-slate-600 dark:hover:text-slate-200"
        >
          <Close fontSize="small" />
        </IconButton>

        <DialogTitle className="p-0 mb-4 pr-8 text-xl font-bold text-text-color">
          {title}
        </DialogTitle>

        <div className="text-sm text-slate-600 dark:text-slate-300">{children}</div>

        {hasActions && (
          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
            {cancelButton && (
              <button
                onClick={cancelButton.onClick ?? onClose}
                disabled={cancelButton.disabled}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelButton.label ?? "Cancel"}
              </button>
            )}

            {confirmButton && (
              <button
                onClick={confirmButton.onClick}
                disabled={confirmButton.disabled || confirmButton.loading}
                className={`px-4 py-2 text-sm font-medium rounded-lg text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${confirmColorClass}`}
              >
                {confirmButton.loading && (
                  <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                )}
                {confirmButton.label ?? "Confirm"}
              </button>
            )}
          </div>
        )}
      </div>
    </Dialog>
  );
}
