"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { GlassCard, BentoCard, Pill, PrimaryButton, SecondaryButton, SectionTitle } from "../components/Glass";
import { categories, featureCards, deliveryOptions, documents, assistantMockAnswers } from "../components/mocks";
import { useMode } from "../components/ModeToggle";
import { Modal } from "../components/Modal";
import { Drawer } from "../components/Drawer";
import { useToast } from "../components/Toast";
import { Reveal } from "../components/Reveal";

type TaskKey = "walls" | "facade" | "wood" | "metal";

const taskTitles: Record<TaskKey, string> = {
  walls: "Покраска стен",
  facade: "Фасад",
  wood: "Дерево",
  metal: "Металл",
};

const taskRecs: Record<TaskKey, { title: string; note: string }[]> = {
  walls: [
    { title: "Интерьерная моющаяся", note: "Матовая, износостойкая" },
    { title: "Грунт глубокого проникновения", note: "Подготовка основания" },
    { title: "Колеровка (мок)", note: "Палитра под задачу" },
  ],
  facade: [
    { title: "Фасадная атмосферостойкая", note: "Для минеральных оснований" },
    { title: "Грунт фасадный", note: "Сцепление и ровность" },
    { title: "Антисептик (мок)", note: "Для сложных условий" },
  ],
  wood: [
    { title: "Антисептик для древесины", note: "Защита и пропитка" },
    { title: "Лак защитный", note: "Полуматовый (мок)" },
    { title: "Эмаль по дереву", note: "Гладкое покрытие" },
  ],
  metal: [
    { title: "Эмаль по металлу", note: "Ударопрочная (мок)" },
    { title: "Грунт антикоррозийный", note: "База под эмаль" },
    { title: "Растворитель", note: "Подбор по системе" },
  ],
};

export default function HomePage() {
  const { mode } = useMode();
  const { pushToast } = useToast();

  const [taskOpen, setTaskOpen] = useState(false);
  const [taskKey, setTaskKey] = useState<TaskKey>("walls");

  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);

  const hero = useMemo(() => {
    if (mode === "b2b") {
      return {
        title: "ЛКМ для бизнеса: производство, документы, стабильные поставки",
        subtitle: "Прайс, условия дилера и быстрый подбор системы под задачу.",
        ctaPrimary: "Запросить прайс",
        ctaSecondary: "Стать дилером",
      };
    }
    return {
      title: "Краска, которая ложится ровно и служит долго",
      subtitle: "Подбор по задаче, понятные системы и доставка по РФ.",
      ctaPrimary: "В каталог",
      ctaSecondary: "Выбрать краску",
    };
  }, [mode]);

  const finalCta = useMemo(() => {
    if (mode === "b2b") {
      return { title: "Получить прайс и условия дилера", button: "Отправить заявку" };
    }
    return { title: "Поможем выбрать краску", button: "Оформить заказ" };
  }, [mode]);

  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-6 md:px-6 md:pt-10">
      <Reveal>
        <GlassCard className="rounded-block p-5 md:p-8" tint="primary">
          <div className="grid gap-5 md:grid-cols-[1.2fr_0.8fr] md:gap-6">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2">
                <Pill>{mode === "b2b" ? "B2B режим" : "B2C режим"}</Pill>
                <Pill>Прототип</Pill>
              </div>

              <h1 className="mt-4 text-[28px] font-semibold leading-[1.08] tracking-[-0.02em] text-ink md:text-[42px]">
                {hero.title}
              </h1>
              <p className="mt-3 max-w-[62ch] text-[14px] leading-[1.5] text-ink/70 md:text-[16px]">
                {hero.subtitle}
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton
                  onClick={() => pushToast(`${hero.ctaPrimary}: лид (мок)`)}
                  ariaLabel={hero.ctaPrimary}
                >
                  {hero.ctaPrimary}
                </PrimaryButton>
                <SecondaryButton
                  onClick={() => pushToast(`${hero.ctaSecondary}: лид (мок)`)}
                  ariaLabel={hero.ctaSecondary}
                >
                  {hero.ctaSecondary}
                </SecondaryButton>
              </div>

              <div className="mt-5 text-[12px] text-ink/60">
                Быстрые состояния UI, без оплат и интеграций.
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:content-start">
              {featureCards.map((c) => (
                <BentoCard key={c.title} title={c.title} subtitle={c.subtitle} icon={c.icon} />
              ))}
            </div>
          </div>
        </GlassCard>
      </Reveal>

      <div className="h-8 md:h-10" />

      <Reveal>
        <section>
          <SectionTitle title="Категории" subtitle="Кликабельно: переход в заглушку каталога с параметром." />
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalog?cat=${encodeURIComponent(cat.slug)}`}
                className="group"
                aria-label={`Категория: ${cat.title}`}
              >
                <GlassCard className="rounded-card p-4 transition-[transform,box-shadow]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[14px] font-semibold text-ink">{cat.title}</div>
                      <div className="mt-1 text-[12px] text-ink/60">{cat.note}</div>
                    </div>
                    <div className="shrink-0">
                      <Pill subtle>→</Pill>
                    </div>
                  </div>
                  <div className="mt-4 h-[1px] w-full bg-ink/10" />
                  <div className="mt-3 text-[12px] text-ink/65">{cat.hint}</div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      <div className="h-8 md:h-10" />

      <Reveal>
        <section>
          <SectionTitle title="Подбор по задаче" subtitle="Кликабельно: модалка с рекомендациями (мок)." />
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {(Object.keys(taskTitles) as TaskKey[]).map((k) => (
              <button
                key={k}
                type="button"
                className="text-left"
                onClick={() => {
                  setTaskKey(k);
                  setTaskOpen(true);
                }}
                aria-label={`Подбор: ${taskTitles[k]}`}
              >
                <GlassCard className="rounded-card p-4" tint="secondary1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[14px] font-semibold text-ink">{taskTitles[k]}</div>
                    <Pill subtle>Открыть</Pill>
                  </div>
                  <div className="mt-3 text-[12px] text-ink/65">2–3 позиции, быстрый переход в каталог.</div>
                </GlassCard>
              </button>
            ))}
          </div>
        </section>
      </Reveal>

      <div className="h-8 md:h-10" />

      <Reveal>
        <section>
          <SectionTitle title="Документы и безопасность" subtitle="Кликабельно: drawer со списком PDF (мок)." />
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Сертификаты", note: "Соответствие и качество" },
              { title: "Паспорта безопасности", note: "SDS и хранение" },
              { title: "Технические паспорта", note: "Характеристики" },
              { title: "PDF каталоги", note: "Линейки и системы" },
            ].map((i) => (
              <button
                key={i.title}
                type="button"
                className="text-left"
                onClick={() => setDocsOpen(true)}
                aria-label={`Документы: ${i.title}`}
              >
                <GlassCard className="rounded-card p-4" tint="secondary2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[14px] font-semibold text-ink">{i.title}</div>
                      <div className="mt-1 text-[12px] text-ink/60">{i.note}</div>
                    </div>
                    <Pill subtle>PDF</Pill>
                  </div>
                </GlassCard>
              </button>
            ))}
          </div>
        </section>
      </Reveal>

      <div className="h-8 md:h-10" />

      <Reveal>
        <section>
          <SectionTitle title="Доставка" subtitle="Кликабельно: модалка с формой уточнения (мок)." />
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {deliveryOptions.map((d) => (
              <GlassCard key={d.title} className="rounded-card p-4" tint="primary">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[14px] font-semibold text-ink">{d.title}</div>
                    <div className="mt-1 text-[12px] text-ink/60">{d.note}</div>
                    <div className="mt-3 text-[12px] text-ink/65">{d.conditions}</div>
                  </div>
                  <Pill subtle>{d.badge}</Pill>
                </div>

                <div className="mt-4">
                  <SecondaryButton
                    onClick={() => setDeliveryOpen(true)}
                    ariaLabel="Уточнить доставку"
                    size="sm"
                  >
                    Уточнить доставку
                  </SecondaryButton>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>
      </Reveal>

      <div className="h-8 md:h-10" />

      <Reveal>
        <section>
          <GlassCard className="rounded-block p-5 md:p-8" tint="secondary1">
            <div className="grid gap-5 md:grid-cols-[1fr_1fr] md:gap-8">
              <div>
                <h2 className="text-[22px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink md:text-[28px]">
                  {finalCta.title}
                </h2>
                <p className="mt-2 max-w-[56ch] text-[13px] leading-[1.55] text-ink/70 md:text-[14px]">
                  Контактные данные не отправляются. Это только поведение формы и toast.
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Field label="Имя" placeholder="Как к вам обращаться" />
                  <Field label="Телефон" placeholder="+7 ___ ___ __ __" />
                  <Field label="Город" placeholder="Ульяновск" />
                  <Field label="Комментарий" placeholder="Коротко: что нужно" spanFull />
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <PrimaryButton
                    onClick={() => pushToast("Заявка отправлена (мок)")}
                    ariaLabel={finalCta.button}
                  >
                    {finalCta.button}
                  </PrimaryButton>
                  <SecondaryButton
                    onClick={() => pushToast("Менеджер свяжется (мок)")}
                    ariaLabel="Связаться"
                  >
                    Связаться
                  </SecondaryButton>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 md:content-start">
                {[
                  { title: "Сетка и компоненты", note: "Bento + стекло" },
                  { title: "Состояния", note: "Ховеры, модалки, тосты" },
                  { title: "Режимы", note: "B2B/B2C тексты" },
                  { title: "Анимации", note: "Плавно и аккуратно" },
                ].map((x) => (
                  <GlassCard key={x.title} className="rounded-card p-4" tint="primary">
                    <div className="text-[14px] font-semibold text-ink">{x.title}</div>
                    <div className="mt-1 text-[12px] text-ink/60">{x.note}</div>
                    <div className="mt-3 h-[1px] w-full bg-ink/10" />
                    <div className="mt-3 text-[12px] text-ink/65">
                      {assistantMockAnswers[Math.floor(Math.random() * assistantMockAnswers.length)]?.label ?? "Мок"}
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </GlassCard>
        </section>
      </Reveal>

      <div className="h-10 md:h-12" />

      <Reveal>
        <footer className="pb-6">
          <GlassCard className="rounded-block p-5 md:p-6" tint="primary">
            <div className="grid gap-5 md:grid-cols-[1.2fr_0.8fr] md:gap-8">
              <div>
                <div className="text-[14px] font-semibold text-ink">Симбирские краски</div>
                <div className="mt-2 text-[12px] text-ink/65">
                  Прототип витрины. Без интеграций. Только UI и переходы.
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href="/documents" className="group" aria-label="Документы">
                    <Pill subtle>Документы</Pill>
                  </Link>
                  <Link href="/delivery" className="group" aria-label="Доставка">
                    <Pill subtle>Доставка</Pill>
                  </Link>
                  <Link href="/contacts" className="group" aria-label="Контакты">
                    <Pill subtle>Контакты</Pill>
                  </Link>
                </div>
                <div className="mt-4 text-[12px] text-ink/55">© {new Date().getFullYear()} Симбирские краски</div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <GlassCard className="rounded-card p-4" tint="secondary2">
                  <div className="text-[13px] font-semibold text-ink">Контакты</div>
                  <div className="mt-2 text-[12px] text-ink/65">+7 (000) 000-00-00</div>
                  <div className="mt-1 text-[12px] text-ink/65">info@simkraski.ru</div>
                </GlassCard>
                <GlassCard className="rounded-card p-4" tint="secondary1">
                  <div className="text-[13px] font-semibold text-ink">Ссылки</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Pill subtle>Политика</Pill>
                    <Pill subtle>Сертификаты</Pill>
                    <Pill subtle>Паспорта</Pill>
                  </div>
                </GlassCard>
              </div>
            </div>
          </GlassCard>
        </footer>
      </Reveal>

      <Modal
        open={taskOpen}
        title={`Подбор решения: ${taskTitles[taskKey]}`}
        onClose={() => setTaskOpen(false)}
      >
        <div className="grid gap-3">
          {taskRecs[taskKey].map((p) => (
            <GlassCard key={p.title} className="rounded-card p-4" tint="primary">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-ink">{p.title}</div>
                  <div className="mt-1 text-[12px] text-ink/65">{p.note}</div>
                </div>
                <Pill subtle>Мок</Pill>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <PrimaryButton
            onClick={() => {
              setTaskOpen(false);
              pushToast("Переход в каталог (мок)");
            }}
            ariaLabel="Перейти в каталог"
          >
            Перейти в каталог
          </PrimaryButton>
          <SecondaryButton onClick={() => setTaskOpen(false)} ariaLabel="Закрыть">
            Закрыть
          </SecondaryButton>
        </div>
      </Modal>

      <Modal open={deliveryOpen} title="Уточнить доставку" onClose={() => setDeliveryOpen(false)}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Имя" placeholder="Имя" />
          <Field label="Телефон" placeholder="+7 ___ ___ __ __" />
          <Field label="Город" placeholder="Город" />
          <Field label="Комментарий" placeholder="Куда и что везём" spanFull />
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <PrimaryButton
            onClick={() => {
              setDeliveryOpen(false);
              pushToast("Запрос по доставке отправлен (мок)");
            }}
            ariaLabel="Отправить"
          >
            Отправить
          </PrimaryButton>
          <SecondaryButton onClick={() => setDeliveryOpen(false)} ariaLabel="Закрыть">
            Закрыть
          </SecondaryButton>
        </div>
      </Modal>

      <Drawer open={docsOpen} title="Документы (мок PDF)" onClose={() => setDocsOpen(false)}>
        <div className="grid gap-3">
          {documents.map((d) => (
            <GlassCard key={d.name} className="rounded-card p-4" tint="secondary2">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-ink">{d.name}</div>
                  <div className="mt-1 text-[12px] text-ink/65">{d.meta}</div>
                </div>
                <button
                  type="button"
                  onClick={() => pushToast(`Скачать: ${d.name} (мок)`) }
                  className="rounded-sm px-3 py-2 text-[12px] font-medium text-ink transition-[transform,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  aria-label={`Скачать ${d.name}`}
                >
                  <span className="glass inline-flex items-center gap-2 rounded-sm px-3 py-2">
                    Скачать <span className="text-ink/60">↗</span>
                  </span>
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </Drawer>
    </main>
  );
}

function Field({
  label,
  placeholder,
  spanFull,
}: {
  label: string;
  placeholder: string;
  spanFull?: boolean;
}) {
  return (
    <label className={spanFull ? "sm:col-span-2" : ""}>
      <div className="mb-1 text-[12px] font-medium text-ink/70">{label}</div>
      <input
        className="glass w-full rounded-sm px-3 py-3 text-[13px] text-ink placeholder:text-ink/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        placeholder={placeholder}
        aria-label={label}
      />
    </label>
  );
}
