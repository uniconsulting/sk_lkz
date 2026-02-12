import Link from "next/link";

export default function DeliveryPage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-6 md:px-6 md:pt-10">
      <div className="glass rounded-block p-6">
        <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-ink md:text-[34px]">Доставка</h1>
        <p className="mt-2 text-[13px] text-ink/70">Заглушка страницы. В прототипе доставка уточняется с главной.</p>
        <div className="mt-5">
          <Link
            href="/"
            className="glass rounded-sm px-3 py-2 text-[12px] font-medium text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            ← На главную
          </Link>
        </div>
      </div>
    </main>
  );
}
