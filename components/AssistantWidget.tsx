"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { assistantMockAnswers } from "./mocks";
import { cn, isEditableElement } from "./utils";

type AState = "collapsed" | "expanded" | "listening" | "thinking" | "answer";

export function AssistantWidget() {
  const reduce = useReducedMotion();

  const [state, setState] = useState<AState>("collapsed");
  const [answer, setAnswer] = useState<string>("");
  const [prompt, setPrompt] = useState("");
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const label = useMemo(() => {
    if (state === "collapsed") return "AI ассистент";
    if (state === "listening") return "Слушаю (мок)";
    if (state === "thinking") return "Думаю (мок)";
    if (state === "answer") return "Ответ (мок)";
    return "AI ассистент";
  }, [state]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (state === "collapsed") return;
      const t = e.target as Element | null;
      if (!t) return;
      if (wrapRef.current && !wrapRef.current.contains(t)) setState("collapsed");
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [state]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && state !== "collapsed") setState("collapsed");
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
        if (isEditableElement(document.activeElement as Element | null)) return;
        e.preventDefault();
        setState("expanded");
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [state]);

  const askMock = () => {
    setState("thinking");
    const pick = assistantMockAnswers[Math.floor(Math.random() * assistantMockAnswers.length)];
    window.setTimeout(() => {
      setAnswer(pick?.answer ?? "Ответ (мок).");
      setState("answer");
    }, reduce ? 0 : 520);
  };

  const toggle = () => {
    setState((s) => (s === "collapsed" ? "expanded" : "collapsed"));
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div ref={wrapRef} className="fixed bottom-4 right-4 z-[90]">
      <AnimatePresence>
        {state === "collapsed" ? (
          <motion.button
            key="fab"
            type="button"
            aria-label="Открыть AI ассистент"
            className="glass shadow-glass rounded-block border border-ink/10 px-4 py-3 text-[12px] font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            onClick={toggle}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
            transition={reduce ? { duration: 0.01 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mr-2 inline-flex h-2 w-2 rounded-sm bg-primary" aria-hidden="true" />
            AI ассистент
          </motion.button>
        ) : (
          <motion.div
            key="panel"
            role="dialog"
            aria-label={label}
            className="glass shadow-glass rounded-block border border-ink/10 w-[min(360px,calc(100vw-2rem))] p-4"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
            transition={reduce ? { duration: 0.01 } : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[12px] font-semibold text-ink">AI ассистент</div>
                <div className="mt-1 text-[12px] text-ink/60">Ctrl/⌘ L: открыть</div>
              </div>
              <button
                type="button"
                aria-label="Закрыть"
                onClick={() => setState("collapsed")}
                className="glass rounded-sm px-3 py-2 text-[12px] font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                X
              </button>
            </div>

            <div className="mt-3">
              <div className="flex items-center gap-2">
                <StateDot mode={state} />
                <div className="text-[12px] font-medium text-ink/75">
                  {state === "expanded" ? "Готов" : state === "listening" ? "Слушаю" : state === "thinking" ? "Думаю" : "Ответ"}
                </div>
              </div>
            </div>

            <div className="mt-3">
              <input
                ref={inputRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Спросить про подбор..."
                aria-label="Поле вопроса ассистенту"
                className="glass w-full rounded-sm px-3 py-3 text-[13px] text-ink placeholder:text-ink/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              />
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  className={cn(
                    "rounded-sm px-3 py-2 text-[12px] font-semibold text-bg bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                    state === "thinking" ? "opacity-60" : ""
                  )}
                  onClick={askMock}
                  aria-label="Получить ответ (мок)"
                  disabled={state === "thinking"}
                >
                  Ответ (мок)
                </button>
                <button
                  type="button"
                  className="glass rounded-sm px-3 py-2 text-[12px] font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  onClick={() => setState((s) => (s === "listening" ? "expanded" : "listening"))}
                  aria-label="Слушаю (мок)"
                >
                  Слушаю
                </button>
                <button
                  type="button"
                  className="glass ml-auto rounded-sm px-3 py-2 text-[12px] font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  onClick={() => {
                    setPrompt("");
                    setAnswer("");
                    setState("expanded");
                  }}
                  aria-label="Сбросить"
                >
                  Сброс
                </button>
              </div>
            </div>

            {state === "answer" ? (
              <div className="mt-3 rounded-card border border-ink/10 p-3 glass">
                <div className="text-[12px] font-semibold text-ink">Ответ</div>
                <div className="mt-2 text-[12px] leading-[1.55] text-ink/70">{answer}</div>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StateDot({ mode }: { mode: string }) {
  const reduce = useReducedMotion();

  const isActive = mode === "listening" || mode === "thinking";
  const bg = mode === "listening" ? "bg-secondary2" : mode === "thinking" ? "bg-secondary1" : "bg-primary";

  return (
    <motion.span
      className={cn("inline-flex h-2 w-2 rounded-sm", bg)}
      aria-hidden="true"
      animate={
        reduce || !isActive
          ? { opacity: 1 }
          : { opacity: [0.35, 1, 0.35] }
      }
      transition={reduce || !isActive ? { duration: 0.01 } : { duration: 1.2, repeat: Infinity }}
    />
  );
}
