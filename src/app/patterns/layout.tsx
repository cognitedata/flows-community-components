import { SectionLayout } from '@/components/section-layout';

export default function PatternsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SectionLayout>{children}</SectionLayout>;
}
