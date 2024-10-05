import { ReactNode } from 'react';
import Navigation from '@/components/navigation';
import './styles.css';

export default function Layout({ children, ...rest }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  );
}
