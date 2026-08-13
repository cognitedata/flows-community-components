import { IconLayoutDashboard } from "@tabler/icons-react";
import type { LayoutExample } from "@/lib/custom-theming-data";

export function LayoutExampleBlock({ example }: { example: LayoutExample }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-muted-bg">
      <div className="flex h-56 flex-col items-center justify-center gap-3 bg-medium-bg text-muted-fg sm:h-72">
        <IconLayoutDashboard size={32} stroke={1.5} />
        <p className="text-sm">{example.name} mockup coming soon</p>
      </div>
      <div className="flex flex-col gap-1 p-5">
        <h3 className="font-heading text-lg font-semibold">{example.name}</h3>
        <p className="text-sm text-muted-fg">{example.description}</p>
      </div>
    </div>
  );
}
