"use client";

import { ReactNode, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "./utils";

export function Drawer({
  open,
  title,
  onClose,
  children,
  className,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement | null>(null);

  const portalEl = useMemo(() => {
    if (typeof document === "undefined") return null;
    return document.body;
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!portalEl) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[85]"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? { opacity: 1 } : { opacity: 0 }}
          transition={reduce ? { duration: 0.01 } : { duration: 0.28 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/20"
            aria-label="Закрыть drawer по клику вне"
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={cn(
              "absolute right-0 top-0 h-full w-full max-w-[520px] glass border-l border-ink/10 shadow-glass p-5 md:p-6",
              className
            )}
            initial={reduce ? { x: 0 } : { x: 20 }}
            animate={{ x: 0 }}
            exit={reduce ? { x: 0 } : { x: 20 }}
            transition={reduce ? { duration: 0.01 } : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[16px] font-semibold text-ink">{title}</div>
                <div className="mt-2 h-[1px] w-full bg-ink/10" />
              </div>
              <button
                type="button"
                aria-label="Закрыть"
                onClick={onClose}
                className="glass rounded-sm px-3 py-2 text-[12px] font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                X
              </button>
            </div>

            <div className="mt-4">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    portalEl
  );
}
