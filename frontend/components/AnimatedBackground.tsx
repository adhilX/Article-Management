"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        className="absolute w-96 h-96 bg-blue-600 rounded-full filter blur-[100px] opacity-20"
        animate={{ x: [0, 100, 0], y: [0, -100, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "10%", left: "10%" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-blue-600 rounded-full filter blur-[100px] opacity-20"
        animate={{ x: [0, -100, 0], y: [0, 100, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "10%", right: "10%" }}
      />
    </div>
  );
}
