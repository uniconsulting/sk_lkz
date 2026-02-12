import Link from "next/link";

export default function CatalogPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const raw = searchParams?.cat;
  const cat = Array.isArray(raw) ? raw[0] : raw;

  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-6 md:px-6 md:pt-10">
      <div className="glass rounded-block p-6">
        <div className="inline-flex items-center gap-2">
          <span className="rounded-sm px-3 py-2 text-[12px] font-medium text-ink/70 glass">Заглушка</span>
          <span className="rounded-sm px-3 py-2 text-[12px] font-medium text-ink/70 glass">/catalog</span>
        </div>

        <h1 className="mt-4 text-[26px] font-semibold tracking-[-0.02em] text-ink md:text-[34px]">Каталог</h1>
        <p className="mt-2 text-[13px] text-ink/70">
          Параметр cat: <span className="font-semibold text-ink">{cat ?? "не задан"}</span>
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href="/"
            className="glass rounded-sm px-3 py-2 text-[12px] font-medium text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            ← На главную
          </Link>
          <Link
            href="/documents"
            className="glass rounded-sm px-3 py-2 text-[12px] font-medium text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            Документы
          </Link>
        </div>
      </div>
    </main>
  );
}
