import { IconExternalLink } from "@tabler/icons-react";
import { chromaticStorybookManagerUrl } from "@/lib/chromatic-storybook";
import { useStorybookTheme } from "@/lib/storybook-theme";

export function StorybookLink({ storyId }: { storyId: string }) {
  const theme = useStorybookTheme();
  const href = chromaticStorybookManagerUrl(storyId, theme);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs font-medium text-link-fg transition-colors hover:text-link-fg-hover"
    >
      Storybook
      <IconExternalLink size={12} />
    </a>
  );
}
