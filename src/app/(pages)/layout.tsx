import { ReactNode } from 'react';
import type { Metadata } from 'next';
import Navigation from '@/components/navigation';

export default function Layout({ children, ...rest }: { children: ReactNode }) {
  return (
    <>
      <Navigation active="blog" />
      <main className="pt-8">{children}</main>
    </>
  );
}
