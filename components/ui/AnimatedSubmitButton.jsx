import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

export default function AnimatedSubmitButton({
  status, // "idle" | "loading" | "success"
  idleText = "Submit",
  loadingText = "Sending...",
  successText = "Success!",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <motion.button
      whileTap={{ scale: status === "idle" ? 0.97 : 1 }}
      type="submit"
      disabled={status !== "idle" || disabled}
      className={`relative flex items-center justify-center overflow-hidden transition-colors ${
        status === "success"
          ? "bg-emerald-500 text-white hover:bg-emerald-600"
          : className
      }`}
      {...props}
    >
      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2"
          >
            {idleText}
          </motion.div>
        )}

        {status === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2"
          >
            <Loader2 className="w-5 h-5 animate-spin" />
            {loadingText}
          </motion.div>
        )}

        {status === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2 font-bold"
          >
            <Check className="w-5 h-5" />
            {successText}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
