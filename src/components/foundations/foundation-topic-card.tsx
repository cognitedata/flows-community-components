import * as React from 'react';
import { Link } from 'react-router-dom';

import type { FoundationTopic } from '@/lib/foundations-topics-data';
import { cn } from '@/lib/utils';

export function FoundationTopicCard({
  topic,
  className,
}: {
  topic: FoundationTopic;
  className?: string;
}) {
  const Icon = topic.icon;
  const isWide = (topic.colSpan ?? 1) >= 2;
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = React.useState(false);
  const [isVideoReady, setIsVideoReady] = React.useState(false);
  const showHoverVideo = isHovering && isVideoReady;

  const handleMouseEnter = () => {
    setIsHovering(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const content = (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          // Below `lg` every card is a single grid column, so a plain 4:3
          // ratio is correct. At `lg` the grid is a 3-column, gap-4 (16px)
          // layout — the height below is solved algebraically from the
          // container's own width (via container query units) for what a
          // single column's 4:3 height would be, then applied to every card
          // regardless of how many columns it spans, so multi-column cards'
          // images line up exactly with single-column ones instead of only
          // approximating it via a scaled aspect-ratio.
          'relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-medium-bg text-muted-fg transition-colors duration-200 group-hover:bg-fjord-100 group-hover:text-fjord-500 group-hover:shadow-[0_0_20px_2px_rgba(95,131,226,0.2)]',
          'lg:aspect-auto lg:h-[calc((100cqw-32px)*0.25)]'
        )}
      >
        {topic.image ? (
          <>
            <img
              src={topic.image}
              alt=""
              className={cn(
                'h-full w-full object-cover transition-opacity duration-200',
                showHoverVideo && 'opacity-0'
              )}
            />
            {topic.hoverVideo && (
              <video
                ref={videoRef}
                src={topic.hoverVideo}
                loop
                muted
                playsInline
                preload="auto"
                onCanPlay={() => setIsVideoReady(true)}
                className={cn(
                  'absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-200',
                  showHoverVideo && 'opacity-100'
                )}
              />
            )}
          </>
        ) : (
          <Icon size={40} stroke={1.5} />
        )}
      </div>
      <div className={cn('flex flex-col gap-1.5 p-5', isWide && 'mt-auto')}>
        <h3 className="font-heading text-lg font-semibold">{topic.name}</h3>
        <p className="text-sm text-muted-fg">{topic.description}</p>
      </div>
    </>
  );

  const wrapperClassName = cn(
    'group flex h-full flex-col overflow-hidden rounded-2xl bg-muted-bg',
    className
  );

  if (topic.href) {
    return (
      <Link to={topic.href} className={wrapperClassName}>
        {content}
      </Link>
    );
  }

  return <div className={wrapperClassName}>{content}</div>;
}
