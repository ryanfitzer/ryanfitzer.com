import { ReactNode } from 'react';
import Navigation from '@/app/(components)/navigation';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="pt-8">
      <Navigation active="portfolio" />
      {children}
    </main>
  );
}
