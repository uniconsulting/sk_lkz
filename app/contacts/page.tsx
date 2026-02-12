import Link from "next/link";

export default function ContactsPage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-6 md:px-6 md:pt-10">
      <div className="glass rounded-block p-6">
        <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-ink md:text-[34px]">Контакты</h1>
        <p className="mt-2 text-[13px] text-ink/70">Заглушка страницы.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="glass rounded-card p-4">
            <div className="text-[13px] font-semibold text-ink">Телефон</div>
            <div className="mt-2 text-[12px] text-ink/65">+7 (000) 000-00-00</div>
          </div>
          <div className="glass rounded-card p-4">
            <div className="text-[13px] font-semibold text-ink">Почта</div>
            <div className="mt-2 text-[12px] text-ink/65">info@simkraski.ru</div>
          </div>
        </div>
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
