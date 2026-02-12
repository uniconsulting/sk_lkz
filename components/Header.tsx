"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ModeToggle, useMode } from "./ModeToggle";
import { cn, isEditableElement } from "./utils";
import { useToast } from "./Toast";

export function Header() {
  const { mode } = useMode();
  const { pushToast } = useToast();

  const [searchOpen, setSearchOpen] = useState(false);
  const searchWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t) return;
      if (searchWrapRef.current && !searchWrapRef.current.contains(t)) setSearchOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        if (isEditableElement(document.activeElement as Element | null)) return;
        e.preventDefault();
        const el = document.getElementById("sk_search") as HTMLInputElement | null;
        el?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const headerCta = mode === "b2b" ? "Запросить прайс" : "В каталог";

  return (
    <header className="sticky top-0 z-[60] border-b border-ink/10 bg-bg/70 backdrop-blur-glass">
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-3 px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="На главную">
          <span className="glass inline-flex h-8 w-8 items-center justify-center rounded-sm text-[12px] font-semibold text-ink">
            ▶
          </span>
          <span className="text-[14px] font-semibold tracking-[-0.01em] text-ink">Симбирские краски</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Меню">
          <NavLink href="/catalog" label="Каталог" />
          <NavLink href="/documents" label="Документы" />
          <NavLink href="/delivery" label="Доставка" />
          <NavLink href="/contacts" label="Контакты" />
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div ref={searchWrapRef} className="relative hidden md:block">
            <input
              id="sk_search"
              onFocus={() => setSearchOpen(true)}
              onChange={() => {}}
              placeholder="Поиск (⌘/Ctrl K)"
              aria-label="Поиск"
              className="glass w-[280px] rounded-sm px-3 py-2 text-[12px] font-medium text-ink placeholder:text-ink/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            />
            {searchOpen ? (
              <div className="absolute left-0 top-[calc(100%+10px)] w-full">
                <div className="glass rounded-card border border-ink/10 shadow-glass p-3">
                  <div className="text-[12px] font-semibold text-ink">Подсказка</div>
                  <div className="mt-1 text-[12px] text-ink/65">Название, категория, документ, система.</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="glass rounded-sm px-3 py-2 text-[12px] text-ink/70">интерьерная</span>
                    <span className="glass rounded-sm px-3 py-2 text-[12px] text-ink/70">грунт</span>
                    <span className="glass rounded-sm px-3 py-2 text-[12px] text-ink/70">сертификат</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <ModeToggle className="hidden md:flex" />

          <button
            type="button"
            aria-label={headerCta}
            onClick={() => pushToast(`${headerCta}: лид (мок)`)}
            className="hidden rounded-sm bg-primary px-4 py-2 text-[12px] font-semibold text-bg transition-[transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:translate-y-[1px] md:inline-flex"
          >
            {headerCta}
          </button>

          <button
            type="button"
            aria-label="Заявка"
            onClick={() => pushToast("Заявка: 0 (мок)")}
            className="relative inline-flex h-9 w-10 items-center justify-center rounded-sm glass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <BagIcon />
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-sm bg-secondary2 px-1 text-[11px] font-semibold text-ink">
              0
            </span>
          </button>

          <Link
            href="/catalog"
            className={cn(
              "md:hidden glass rounded-sm px-3 py-2 text-[12px] font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            )}
            aria-label="Каталог"
          >
            Каталог
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-4 pb-3 md:hidden">
        <div className="flex items-center gap-2">
          <ModeToggle className="flex" />
          <button
            type="button"
            aria-label={headerCta}
            onClick={() => pushToast(`${headerCta}: лид (мок)`)}
            className="ml-auto rounded-sm bg-primary px-4 py-2 text-[12px] font-semibold text-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            {headerCta}
          </button>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="glass rounded-sm px-3 py-2 text-[12px] font-semibold text-ink/80 transition-[transform] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:translate-y-[1px]"
      aria-label={label}
    >
      {label}
    </Link>
  );
}

function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path
        d="M7 9V7a5 5 0 0 1 10 0v2"
        stroke="rgb(var(--ink))"
        strokeOpacity="0.9"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6.5 9h11l1 12.5H5.5L6.5 9Z"
        stroke="rgb(var(--ink))"
        strokeOpacity="0.9"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
