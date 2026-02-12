"use client";

import { ReactNode } from "react";
import { ModeProvider } from "./ModeToggle";
import { ToastProvider, ToastViewport } from "./Toast";
import { AssistantWidget } from "./AssistantWidget";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ModeProvider>
      <ToastProvider>
        {children}
        <ToastViewport />
        <AssistantWidget />
      </ToastProvider>
    </ModeProvider>
  );
}
