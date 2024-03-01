import { ReactNode } from 'react';
import Navigation from '@/app/(components)/navigation';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <main className="pt-8">
      <Navigation active="blog" />
      {children}
    </main>
  );
}
