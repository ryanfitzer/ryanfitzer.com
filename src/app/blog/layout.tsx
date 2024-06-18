import { ReactNode } from 'react';
import Navigation from '@/components/navigation';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation active="blog" />
      <main>{children}</main>
    </>
  );
}
