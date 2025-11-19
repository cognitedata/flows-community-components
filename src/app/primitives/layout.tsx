import { SectionLayout } from '@/components/section-layout';

export default function PrimitivesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SectionLayout>{children}</SectionLayout>;
}
