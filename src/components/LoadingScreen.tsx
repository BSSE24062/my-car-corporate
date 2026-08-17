"use client";

import React, { useEffect, useRef } from 'react';

const LoadingScreen = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // iOS Safari requires these to be set programmatically as well as via attributes
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn("Autoplay blocked. Registering user interaction fallback listeners.", error);

        const playOnInteraction = () => {
          video.play()
            .then(() => {
              document.removeEventListener('touchstart', playOnInteraction);
              document.removeEventListener('click', playOnInteraction);
            })
            .catch((err) => console.error("Video play on user interaction failed:", err));
        };

        document.addEventListener('touchstart', playOnInteraction, { passive: true });
        document.addEventListener('click', playOnInteraction, { passive: true });
      });
    }
  }, []);

  return (
    <div className="loader-wrapper">
      {/* Video must always be in the DOM on first render for iOS Safari autoplay to work.
          Never conditionally render the video element behind a state flag. */}
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
