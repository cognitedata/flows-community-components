import { chromaticStorybookEmbedUrl } from "@/lib/chromatic-storybook";
import { useStorybookTheme } from "@/lib/storybook-theme";
import { cn } from "@/lib/utils";

export function ChromaticStorybookEmbed({
  storyId,
  title = "Component preview",
}: {
  storyId: string;
  title?: string;
}) {
  const theme = useStorybookTheme();
  const src = chromaticStorybookEmbedUrl(storyId, theme);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border",
        theme === "dark" ? "bg-[#191b1d]" : "bg-white"
      )}
    >
      <iframe
        key={src}
        src={src}
        title={title}
        className={cn(
          "h-[420px] w-full border-0 sm:h-[480px]",
          theme === "dark" ? "bg-[#191b1d]" : "bg-white"
        )}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allow="clipboard-write"
      />
    </div>
  );
}
