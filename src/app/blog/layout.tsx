import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Ryan Fitzer',
  description: 'Blog',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="px-8 py-8 flex flex-col h-[100lvh] max-w-3xl mx-auto">
      {children}
    </main>
  );
}
