import { ReactNode } from 'react';
import Navigation from '@/components/navigation';
import './styles.css';

export default function Layout({ children, ...rest }: { children: ReactNode }) {
  return (
    <>
      <style>{`body {--color-body-bg: #ffffff; --bg-body-image: none !important;}`}</style>
      <Navigation />
      <main>{children}</main>
    </>
  );
}
