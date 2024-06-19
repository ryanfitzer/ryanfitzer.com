import { ReactNode } from 'react';
import type { Metadata } from 'next';
import Navigation from '@/components/navigation';

export const metadata: Metadata = {
  title: 'Portfolio',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation active="portfolio" />
      <main className="pt-8">{children}</main>
    </>
  );
}
