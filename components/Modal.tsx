"use client";

import { ReactNode, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "./utils";

function focusables(root: HTMLElement | null) {
  if (!root) return [];
  const sel =
    'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';
  return Array.from(root.querySelectorAll<HTMLElement>(sel)).filter((el) => !el.hasAttribute("disabled"));
}

export function Modal({
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
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const portalEl = useMemo(() => {
    if (typeof document === "undefined") return null;
    return document.body;
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const list = focusables(panelRef.current);
        if (list.length === 0) return;
        const first = list[0];
        const last = list[list.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => prev?.focus();
  }, [open]);

  if (!portalEl) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-6"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? { opacity: 1 } : { opacity: 0 }}
          transition={reduce ? { duration: 0.01 } : { duration: 0.28 }}
          aria-hidden={false}
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/20"
            aria-label="Закрыть по клику вне"
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={cn(
              "relative z-[81] w-full max-w-[720px] glass rounded-block border border-ink/10 shadow-glass p-5 md:p-6",
              className
            )}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
            transition={reduce ? { duration: 0.01 } : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[16px] font-semibold text-ink">{title}</div>
                <div className="mt-2 h-[1px] w-full bg-ink/10" />
              </div>
              <button
                ref={closeRef}
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
