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
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = React.useState(false);
  const [isVideoReady, setIsVideoReady] = React.useState(false);
  const showHoverVideo = isHovering && isVideoReady;

  const handleMouseEnter = () => {
    setIsHovering(true);
    void videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
      return;
    }
    // Restart before the last frames so the decoder never paints the rest-pose
    // hold (or a blank frame) at the native loop seam.
    if (video.currentTime >= video.duration - 0.08) {
      video.currentTime = 0.04;
      void video.play();
    }
  };

  const content = (
    <>
      <div className="relative flex aspect-[3/2] items-center justify-center overflow-hidden bg-medium-bg text-muted-fg">
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
                muted
                playsInline
                preload="auto"
                onCanPlay={() => setIsVideoReady(true)}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => {
                  const video = videoRef.current;
                  if (!video) return;
                  video.currentTime = 0.04;
                  void video.play();
                }}
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
      <div className="flex flex-col gap-1.5 p-5">
        <h3 className="font-heading text-lg font-semibold">{topic.name}</h3>
        <p className="text-sm text-muted-fg">{topic.description}</p>
      </div>
    </>
  );

  const wrapperClassName = cn(
    'group flex h-full flex-col overflow-hidden rounded-2xl bg-muted-bg',
    topic.href && 'cursor-pointer transition-colors hover:bg-medium-bg',
    className
  );

  const hoverProps = topic.hoverVideo
    ? {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      }
    : undefined;

  if (topic.href) {
    return (
      <Link to={topic.href} className={wrapperClassName} {...hoverProps}>
        {content}
      </Link>
    );
  }

  return (
    <div className={wrapperClassName} {...hoverProps}>
      {content}
    </div>
  );
}
