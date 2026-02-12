"use client";

import { ReactNode } from "react";
import { cn } from "./utils";

type Tint = "primary" | "secondary1" | "secondary2" | "none";

export function GlassCard({
  className,
  children,
  tint = "none",
}: {
  className?: string;
  children: ReactNode;
  tint?: Tint;
}) {
  return (
    <div
      className={cn(
        "glass shadow-glass border border-ink/10 backdrop-blur-glass",
        tint === "primary" && "glass-tint-primary",
        tint === "secondary1" && "glass-tint-secondary1",
        tint === "secondary2" && "glass-tint-secondary2",
        "hover:shadow-glassHover",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: string;
}) {
  return (
    <GlassCard className="rounded-card p-4" tint="primary">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[13px] font-semibold text-ink">{title}</div>
          <div className="mt-1 text-[12px] text-ink/60">{subtitle}</div>
        </div>
        <div className="shrink-0 rounded-sm px-3 py-2 text-[12px] font-semibold text-ink/70 glass" aria-hidden="true">
          {icon}
        </div>
      </div>
    </GlassCard>
  );
}

export function Pill({ children, subtle }: { children: ReactNode; subtle?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-3 py-2 text-[12px] font-medium glass",
        subtle ? "text-ink/70" : "text-ink"
      )}
    >
      {children}
    </span>
  );
}

export function PrimaryButton({
  children,
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  onClick?: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="rounded-sm bg-primary px-4 py-3 text-[13px] font-semibold text-bg transition-[transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:translate-y-[1px]"
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
  ariaLabel,
  size = "md",
}: {
  children: ReactNode;
  onClick?: () => void;
  ariaLabel: string;
  size?: "sm" | "md";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "glass rounded-sm font-semibold text-ink transition-[transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:translate-y-[1px]",
        size === "md" ? "px-4 py-3 text-[13px]" : "px-3 py-2 text-[12px]"
      )}
    >
      {children}
    </button>
  );
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <div className="text-[18px] font-semibold tracking-[-0.01em] text-ink md:text-[20px]">{title}</div>
        {subtitle ? <div className="mt-1 text-[12px] text-ink/65">{subtitle}</div> : null}
      </div>
    </div>
  );
}
