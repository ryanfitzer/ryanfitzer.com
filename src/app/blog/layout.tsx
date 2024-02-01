import { ReactNode } from 'react';
import type { Metadata } from 'next';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <main className="pt-8">{children}</main>;
}
