"use client";

import React, { useEffect, useRef } from 'react';

interface LoadingScreenProps {
  hidden?: boolean;
}

const LoadingScreen = ({ hidden = false }: LoadingScreenProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    /*
     * WHY innerHTML instead of JSX <video>:
     * React (including React 19) does NOT serialize the `muted` boolean prop
     * to the actual HTML `muted` attribute. iOS Safari makes its autoplay
     * decision based on the presence of the `muted` HTML attribute, NOT the
     * JS property. By injecting via innerHTML we guarantee the attribute is
     * present in the DOM string that iOS Safari evaluates.
     */
    wrapper.innerHTML = `
      <video
        autoplay
        loop
        muted
        playsinline
        webkit-playsinline
        preload="auto"
        style="display:block;max-width:100%;max-height:100%;object-fit:contain;"
      >
        <source src="/loading.mp4" type="video/mp4" />
      </video>
    `;

    const video = wrapper.querySelector('video') as HTMLVideoElement | null;
    if (!video) return;

    // Belt-and-suspenders: also set via JS properties
    video.muted = true;
    (video as any).defaultMuted = true;
    video.playsInline = true;

    // Call load() before play() — required on some iOS versions
    video.load();

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('iOS autoplay blocked, waiting for first touch:', err);

          const onTouch = () => {
            video.play()
              .then(() => {
                document.removeEventListener('touchstart', onTouch);
                document.removeEventListener('click', onTouch);
              })
              .catch((e) => console.error('Play on interaction failed:', e));
          };

          document.addEventListener('touchstart', onTouch, { passive: true });
          document.addEventListener('click', onTouch, { passive: true });
        });
      }
    };

    // Some iOS versions need a tiny delay after load() before play()
    video.addEventListener('loadedmetadata', tryPlay, { once: true });
    // Fallback: also try immediately
    tryPlay();
  }, []);

  return (
    /*
     * CRITICAL: This component must NEVER be conditionally unmounted.
     * Use the `hidden` prop + CSS to hide it. If unmounted and remounted,
     * iOS Safari will block autoplay on the re-injected video.
     */
    <div
      className={`loader-wrapper${hidden ? ' loader-hidden' : ''}`}
      aria-hidden={hidden}
      ref={wrapperRef}
    />
  );
};

export default LoadingScreen;
