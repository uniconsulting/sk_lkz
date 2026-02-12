"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn, clamp } from "./utils";

type ToastItem = { id: string; message: string };

const ToastCtx = createContext<{ pushToast: (message: string) => void }>({ pushToast: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const timers = useRef<Record<string, number>>({});

  const pushToast = (message: string) => {
    const id = `${Date.now()}_${Math.random().toString(16).slice(2)}`;
    setItems((prev) => [{ id, message }, ...prev].slice(0, 4));

    const ms = clamp(2600 + message.length * 8, 2600, 4600);
    const t = window.setTimeout(() => {
      setItems((prev) => prev.filter((x) => x.id !== id));
      delete timers.current[id];
    }, ms);
    timers.current[id] = t;
  };

  useEffect(() => {
    return () => {
      Object.values(timers.current).forEach((t) => window.clearTimeout(t));
      timers.current = {};
    };
  }, []);

  const value = useMemo(() => ({ pushToast }), []);

  return (
    <ToastCtx.Provider value={value}>
      {children}
      <ToastInternal items={items} />
    </ToastCtx.Provider>
  );
}

export function useToast() {
  return useContext(ToastCtx);
}

export function ToastViewport() {
  return null;
}

function ToastInternal({ items }: { items: ToastItem[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="fixed bottom-4 left-4 z-[95] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2">
      <AnimatePresence>
        {items.map((t) => (
          <motion.div
            key={t.id}
            className={cn("glass rounded-card border border-ink/10 shadow-glass px-4 py-3")}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
            transition={reduce ? { duration: 0.01 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            aria-live="polite"
          >
            <div className="text-[12px] font-medium text-ink">{t.message}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
