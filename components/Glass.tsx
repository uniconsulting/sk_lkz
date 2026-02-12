import type { PropsWithChildren } from 'react';

export function Glass({ children }: PropsWithChildren) {
  return <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur">{children}</div>;
}
