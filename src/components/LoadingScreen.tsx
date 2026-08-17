"use client";

import React, { useEffect, useRef } from 'react';

const LoadingScreen = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Belt-and-suspenders for iOS Safari: set muted/playsInline as JS properties too
    video.muted = true;
    video.playsInline = true;

    video.play().catch(() => {
      // Autoplay blocked — silent fail, video will stay paused
    });
  }, []);

  return (
    <div className="loader-wrapper">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/loading.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default LoadingScreen;
