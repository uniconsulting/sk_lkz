"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function Reveal({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={
        reduce
          ? { duration: 0.01 }
          : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
