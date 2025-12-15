'use client';

// Typography scale definitions
const typographyScale = [
  {
    section: 'Text',
    name: 'xxs/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '10px',
    lineHeight: '12px',
    usage: 'metadata; short labels',
    tailwindClass: 'text-2xs font-normal',
  },
  {
    section: 'Text',
    name: 'xxs/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '10px',
    lineHeight: '12px',
    usage: 'metadata; short labels; emphasis',
    tailwindClass: 'text-2xs font-medium',
  },
  {
    section: 'Text',
    name: 'xs/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '12px',
    lineHeight: '14px',
    usage: 'charting labels',
    tailwindClass: 'text-xs font-normal',
  },
  {
    section: 'Text',
    name: 'xs/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '12px',
    lineHeight: '14px',
    usage: 'charting labels; emphasis',
    tailwindClass: 'text-xs font-medium',
  },
  {
    section: 'Text',
    name: 'sm/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '14px',
    lineHeight: '18px',
    usage: 'secondary text; short labels',
    tailwindClass: 'text-sm font-normal',
  },
  {
    section: 'Text',
    name: 'sm/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '14px',
    lineHeight: '18px',
    usage: 'secondary text; short labels; emphasis',
    tailwindClass: 'text-sm font-medium',
  },
  {
    section: 'Text',
    name: 'base/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '16px',
    lineHeight: '20px',
    usage: 'default body text',
    tailwindClass: 'text-base font-normal',
  },
  {
    section: 'Text',
    name: 'base/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '16px',
    lineHeight: '20px',
    usage: 'default body text; emphasis',
    tailwindClass: 'text-base font-medium',
  },
  {
    section: 'Text',
    name: 'lg/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '18px',
    lineHeight: '24px',
    usage: 'headers; subtitles; labels',
    tailwindClass: 'text-lg font-normal',
  },
  {
    section: 'Text',
    name: 'lg/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '18px',
    lineHeight: '24px',
    usage: 'headers; subtitles; labels; emphasis',
    tailwindClass: 'text-lg font-medium',
  },
  {
    section: 'Text',
    name: 'xl/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '20px',
    lineHeight: '24px',
    usage: 'headers; subtitles; labels',
    tailwindClass: 'text-xl font-normal',
  },
  {
    section: 'Text',
    name: 'xl/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '20px',
    lineHeight: '24px',
    usage: 'headers; subtitles; labels; emphasis',
    tailwindClass: 'text-xl font-medium',
  },
  {
    section: 'Text',
    name: '2xl/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '24px',
    lineHeight: '28px',
    usage: 'headers; subtitles; labels',
    tailwindClass: 'text-2xl font-normal',
  },
  {
    section: 'Text',
    name: '2xl/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '24px',
    lineHeight: '28px',
    usage: 'headers; subtitles; labels; emphasis',
    tailwindClass: 'text-2xl font-medium',
  },
  {
    section: 'Marketing',
    name: '2xl/medium',
    fontFamily: 'Space Grotesk',
    fontWeight: 'Medium',
    fontSize: '24px',
    lineHeight: '28px',
    usage: 'marketing headers; onboarding, sign-in; emphasis',
    tailwindClass: 'font-marketing text-2xl font-medium',
  },
  {
    section: 'Text',
    name: '3xl/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '28px',
    lineHeight: '32px',
    usage: 'headers; subtitles; labels',
    tailwindClass: 'text-3xl font-normal',
  },
  {
    section: 'Text',
    name: '3xl/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '28px',
    lineHeight: '32px',
    usage: 'headers; subtitles; labels; emphasis',
    tailwindClass: 'text-3xl font-medium',
  },
  {
    section: 'Marketing',
    name: '3xl/medium',
    fontFamily: 'Space Grotesk',
    fontWeight: 'Medium',
    fontSize: '28px',
    lineHeight: '32px',
    usage: 'marketing headers; onboarding, sign-in; emphasis',
    tailwindClass: 'font-marketing text-3xl font-medium',
  },
  {
    section: 'Text',
    name: '4xl/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '32px',
    lineHeight: '40px',
    usage: 'headers; subtitles; labels',
    tailwindClass: 'text-4xl font-normal',
  },
  {
    section: 'Text',
    name: '4xl/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '32px',
    lineHeight: '40px',
    usage: 'headers; subtitles; labels; emphasis',
    tailwindClass: 'text-4xl font-medium',
  },
  {
    section: 'Marketing',
    name: '4xl/bold',
    fontFamily: 'Space Grotesk',
    fontWeight: 'Bold',
    fontSize: '32px',
    lineHeight: '40px',
    usage: 'marketing headers; onboarding, sign-in; emphasis',
    tailwindClass: 'font-marketing text-4xl font-bold',
  },
  {
    section: 'Text',
    name: '5xl/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '36px',
    lineHeight: '44px',
    usage: 'headers; subtitles; labels',
    tailwindClass: 'text-5xl font-normal',
  },
  {
    section: 'Text',
    name: '5xl/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '36px',
    lineHeight: '44px',
    usage: 'headers; subtitles; labels; emphasis',
    tailwindClass: 'text-5xl font-medium',
  },
  {
    section: 'Marketing',
    name: '5xl/bold',
    fontFamily: 'Space Grotesk',
    fontWeight: 'Bold',
    fontSize: '36px',
    lineHeight: '44px',
    usage: 'marketing headers; onboarding, sign-in; short headers emphasis',
    tailwindClass: 'font-marketing text-5xl font-bold',
  },
  {
    section: 'Code',
    name: 'sm',
    fontFamily: 'Source Code Pro',
    fontWeight: 'Medium',
    fontSize: '14px',
    lineHeight: '18px',
    usage: 'code examples',
    tailwindClass: 'font-mono text-sm font-medium',
  },
  {
    section: 'Code',
    name: 'md',
    fontFamily: 'Source Code Pro',
    fontWeight: 'Medium',
    fontSize: '16px',
    lineHeight: '20px',
    usage: 'code examples',
    tailwindClass: 'font-mono text-base font-medium',
  },
  {
    section: 'Code',
    name: 'lg',
    fontFamily: 'Source Code Pro',
    fontWeight: 'Medium',
    fontSize: '18px',
    lineHeight: '24px',
    usage: 'code examples',
    tailwindClass: 'font-mono text-lg font-medium',
  },
];

function TypographyRow({ item }: { item: (typeof typographyScale)[0] }) {
  return (
    <div className="py-8">
      <h3 className="text-2xl font-normal text-foreground mb-6">{item.name}</h3>
      <div className="grid grid-cols-[280px_1fr]  border-b border-border last:border-b-0">
        {/* Left column - style info */}
        <div className="space-y-2">
          <p className="text-sm text-foreground">
            {item.fontFamily} {item.fontWeight}
          </p>
          <p className="text-sm text-foreground">
            {item.fontSize} size / {item.lineHeight} line height
          </p>
        </div>

        {/* Right column - sample and usage */}
        <div className="space-y-2 flex flex-col justify-center">
          <p className={`text-foreground ${item.tailwindClass}`}>
            The quick brown fox jumps over the lazy dog.
          </p>
          <p className="text-base text-muted-foreground">{item.usage}</p>
        </div>
      </div>
    </div>
  );
}

export default function TypographyPage() {
  const sections = [
    { title: 'Text' as const, description: 'Regular text typography' as const },
    {
      title: 'Marketing' as const,
      description: 'Marketing typography for marketing pages' as const,
    },
    {
      title: 'Code' as const,
      description: 'Code typography for code blocks' as const,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Typography</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Type scale and font weights available in the design system
        </p>
      </div>

      {sections.map((section) => (
        <div key={section.title} className="space-y-0">
          <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
          <p className="text-muted-foreground">{section.description}</p>
          <div className="divide-y divide-border">
            {typographyScale
              .filter((item) => item.section === section.title)
              .map((item) => (
                <TypographyRow
                  key={`${section.title}-${item.name}-${item.fontFamily}-${item.fontWeight}`}
                  item={item}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
