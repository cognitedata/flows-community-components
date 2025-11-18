import { SectionLayout } from '#components/section-layout';

export default function BlocksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SectionLayout>{children}</SectionLayout>;
}
