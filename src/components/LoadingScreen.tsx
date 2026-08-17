"use client";

import React, { useEffect, useRef } from 'react';

interface LoadingScreenProps {
  hidden?: boolean;
}

const LoadingScreen = ({ hidden = false }: LoadingScreenProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // iOS Safari requires these set programmatically as well as via HTML attributes
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay blocked, waiting for user interaction:", error);

          const playOnInteraction = () => {
            video.play()
              .then(() => {
                document.removeEventListener('touchstart', playOnInteraction);
                document.removeEventListener('click', playOnInteraction);
              })
              .catch((err) => console.error("Video play on interaction failed:", err));
          };

          document.addEventListener('touchstart', playOnInteraction, { passive: true });
          document.addEventListener('click', playOnInteraction, { passive: true });
        });
      }
    };

    tryPlay();
  }, []);

  return (
    /*
     * IMPORTANT: This wrapper must always stay in the DOM (never unmount this component).
     * iOS Safari will not autoplay a video that is injected after initial page load.
     * Visibility is controlled via the `hidden` class / CSS opacity, NOT by unmounting.
     */
    <div
      className={`loader-wrapper${hidden ? ' loader-hidden' : ''}`}
      aria-hidden={hidden}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{ display: 'block' }}
      >
        <source src="/loading.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default LoadingScreen;
