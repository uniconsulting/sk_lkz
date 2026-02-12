"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { cn } from "./utils";

export type Mode = "b2b" | "b2c";

const ModeCtx = createContext<{
  mode: Mode;
  setMode: (m: Mode) => void;
}>({ mode: "b2b", setMode: () => {} });

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>("b2b");

  useEffect(() => {
    try {
      const v = localStorage.getItem("sk_mode");
      if (v === "b2b" || v === "b2c") setModeState(v);
    } catch {}
  }, []);

  const setMode = (m: Mode) => {
    setModeState(m);
    try {
      localStorage.setItem("sk_mode", m);
    } catch {}
  };

  const value = useMemo(() => ({ mode, setMode }), [mode]);
  return <ModeCtx.Provider value={value}>{children}</ModeCtx.Provider>;
}

export function useMode() {
  return useContext(ModeCtx);
}

export function ModeToggle({ className }: { className?: string }) {
  const { mode, setMode } = useMode();

  return (
    <div className={cn("glass rounded-sm p-1", className)} role="tablist" aria-label="Переключатель режима">
      <button
        type="button"
        role="tab"
        aria-selected={mode === "b2b"}
        aria-label="B2B"
        onClick={() => setMode("b2b")}
        className={cn(
          "rounded-sm px-3 py-2 text-[12px] font-semibold transition-[transform,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
          mode === "b2b" ? "bg-primary/12 text-ink" : "text-ink/70"
        )}
      >
        B2B
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === "b2c"}
        aria-label="B2C"
        onClick={() => setMode("b2c")}
        className={cn(
          "rounded-sm px-3 py-2 text-[12px] font-semibold transition-[transform,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
          mode === "b2c" ? "bg-primary/12 text-ink" : "text-ink/70"
        )}
      >
        B2C
      </button>
    </div>
  );
}
