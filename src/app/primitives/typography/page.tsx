'use client';

// Typography scale definitions
const typographyScale = [
  {
    name: 'xxs/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '10px',
    lineHeight: '12px',
    usage: 'metadata; short labels',
    tailwindClass: 'text-2xs font-normal',
  },
  {
    name: 'xxs/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '10px',
    lineHeight: '12px',
    usage: 'metadata; short labels; emphasis',
    tailwindClass: 'text-2xs font-medium',
  },
  {
    name: 'xs/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '12px',
    lineHeight: '14px',
    usage: 'charting labels',
    tailwindClass: 'text-xs font-normal',
  },
  {
    name: 'xs/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '12px',
    lineHeight: '14px',
    usage: 'charting labels; emphasis',
    tailwindClass: 'text-xs font-medium',
  },
  {
    name: 'sm/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '14px',
    lineHeight: '18px',
    usage: 'secondary text; short labels',
    tailwindClass: 'text-sm font-normal',
  },
  {
    name: 'sm/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '14px',
    lineHeight: '18px',
    usage: 'secondary text; short labels; emphasis',
    tailwindClass: 'text-sm font-medium',
  },
  {
    name: 'base/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '16px',
    lineHeight: '20px',
    usage: 'default body text',
    tailwindClass: 'text-base font-normal',
  },
  {
    name: 'base/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '16px',
    lineHeight: '20px',
    usage: 'default body text; emphasis',
    tailwindClass: 'text-base font-medium',
  },
  {
    name: 'lg/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '18px',
    lineHeight: '24px',
    usage: 'headers; subtitles; labels',
    tailwindClass: 'text-lg font-normal',
  },
  {
    name: 'lg/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '18px',
    lineHeight: '24px',
    usage: 'headers; subtitles; labels; emphasis',
    tailwindClass: 'text-lg font-medium',
  },
  {
    name: 'xl/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '20px',
    lineHeight: '24px',
    usage: 'headers; subtitles; labels',
    tailwindClass: 'text-xl font-normal',
  },
  {
    name: 'xl/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '20px',
    lineHeight: '24px',
    usage: 'headers; subtitles; labels; emphasis',
    tailwindClass: 'text-xl font-medium',
  },
  {
    name: '2xl/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '24px',
    lineHeight: '28px',
    usage: 'headers; subtitles; labels',
    tailwindClass: 'text-2xl font-normal',
  },
  {
    name: '2xl/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '24px',
    lineHeight: '28px',
    usage: 'headers; subtitles; labels; emphasis',
    tailwindClass: 'text-2xl font-medium',
  },
  {
    name: '3xl/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '28px',
    lineHeight: '32px',
    usage: 'headers; subtitles; labels',
    tailwindClass: 'text-3xl font-normal',
  },
  {
    name: '3xl/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '28px',
    lineHeight: '32px',
    usage: 'headers; subtitles; labels; emphasis',
    tailwindClass: 'text-3xl font-medium',
  },
  {
    name: '4xl/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '32px',
    lineHeight: '40px',
    usage: 'headers; subtitles; labels',
    tailwindClass: 'text-4xl font-normal',
  },
  {
    name: '4xl/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '32px',
    lineHeight: '40px',
    usage: 'headers; subtitles; labels; emphasis',
    tailwindClass: 'text-4xl font-medium',
  },
  {
    name: '5xl/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '36px',
    lineHeight: '44px',
    usage: 'headers; subtitles; labels',
    tailwindClass: 'text-5xl font-normal',
  },
  {
    name: '5xl/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '36px',
    lineHeight: '44px',
    usage: 'headers; subtitles; labels; emphasis',
    tailwindClass: 'text-5xl font-medium',
  },
];

function TypographyRow({
  item,
}: {
  item: (typeof typographyScale)[0];
}) {
  return (
    <div className="grid grid-cols-[280px_1fr] gap-8 py-8 border-b border-border last:border-b-0">
      {/* Left column - style info */}
      <div className="space-y-2">
        <h3 className="text-2xl font-normal text-foreground">{item.name}</h3>
        <p className="text-sm text-muted-foreground">
          {item.fontFamily} {item.fontWeight}
        </p>
        <p className="text-sm text-muted-foreground">
          {item.fontSize} size / {item.lineHeight} line height
        </p>
      </div>

      {/* Right column - sample and usage */}
      <div className="space-y-2 flex flex-col justify-center">
        <p className={`text-foreground ${item.tailwindClass}`}>
          The quick brown fox jumps over the lazy dog.
        </p>
        <p className="text-sm text-muted-foreground">{item.usage}</p>
      </div>
    </div>
  );
}

export default function TypographyPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Typography</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Type scale and font weights available in the design system
        </p>
      </div>

      <div className="divide-y divide-border">
        {typographyScale.map((item) => (
          <TypographyRow key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}

