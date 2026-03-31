"use client";

import { AlertCircle, X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading = false,
}: ConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative glass-panel w-full max-w-md rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
          >
            {/* Top Accent Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-red-600 to-red-500" />

            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />
                  <div className="relative w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all active:scale-95"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{title}</h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                {message}
              </p>
            </div>

            <div className="p-6 bg-white/5 border-t border-white/5 flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-6 py-3.5 rounded-2xl font-semibold text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all disabled:opacity-50"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onConfirm}
                disabled={isLoading}
                className="flex-1 px-6 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-br from-red-500 to-red-700 shadow-[0_8px_20px_rgba(220,38,38,0.3)] hover:shadow-[0_12px_25px_rgba(220,38,38,0.4)] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Trash2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Delete
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
