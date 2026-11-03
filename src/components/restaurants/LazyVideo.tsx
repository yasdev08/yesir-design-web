"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muted looping reel that only downloads when it approaches the viewport.
 * Respects prefers-reduced-motion and the browser's data-saver mode: in those
 * cases it shows the poster with controls instead of autoplaying.
 */
export function LazyVideo({ src, poster, label, className }: { src: string; poster?: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    if (reduced || saveData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time capability check after mount
      setManual(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) {
            video.src = src;
            video.load();
          }
          video.play().catch(() => setManual(true));
        } else if (!video.paused) {
          video.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      controls={manual}
      aria-label={label}
      {...(manual ? { src } : {})}
    />
  );
}
