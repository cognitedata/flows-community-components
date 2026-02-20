import { useLocation } from 'react-router-dom';

import {
  SideNavigation,
  getSideNavigationForSection,
} from '@/components/side-navigation';
import { cn } from '@/lib/utils';

interface SectionLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLayout({ children, className }: SectionLayoutProps) {
  const location = useLocation();
  const pathname = location.pathname;

  // Determine the current section from the pathname
  const section = pathname.split('/')[1] || 'overview';
  const sideNavItems = getSideNavigationForSection(section);

  // Don't show side navigation if there are no items
  if (sideNavItems.length === 0) {
    return (
      <div className="px-3 pt-6 pb-8">
        <div className={cn('max-w-4xl mx-auto', className)}>{children}</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Side Navigation */}
      <aside className="w-56 shrink-0 border-r pl-6">
        <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto pt-8 pb-8">
          <SideNavigation items={sideNavItems} />
        </div>
      </aside>
      {/* Main Content */}
      <main className={cn('flex-1 min-w-0 px-6 pt-6 pb-8', className)}>
        {children}
      </main>
    </div>
  );
}
