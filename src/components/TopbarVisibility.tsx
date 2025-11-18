'use client';

import { usePathname } from 'next/navigation';

export function TopbarVisibility({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideTopbar = pathname.startsWith('/eos/shift-handover-app');
  return <>{!hideTopbar && children}</>;
}
