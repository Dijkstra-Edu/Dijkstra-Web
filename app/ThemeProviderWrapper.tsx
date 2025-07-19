// app/ThemeProviderWrapper.tsx
'use client';

import { ThemeProvider } from 'next-themes';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // avoids SSR/CSR mismatch

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
