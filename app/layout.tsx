import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import { AppProviders } from "../components/providers";
import { Header } from "../components/Header";

const garet = localFont({
  src: [
    { path: "../public/fonts/Garet-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Garet-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Garet-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-garet",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Симбирские краски | Прототип витрины",
  description: "Кликабельный прототип витрины ЛКМ без интеграций.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={garet.variable}>
      <body>
        <AppProviders>
          <Header />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
