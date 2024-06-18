import { ReactNode } from 'react';
import Navigation from '@/components/navigation';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation active="portfolio" />
      <main className="pt-8">{children}</main>
    </>
  );
}
