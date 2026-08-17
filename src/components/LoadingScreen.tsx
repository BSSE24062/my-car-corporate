import React, { useEffect, useRef } from 'react';

const LoadingScreen = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Force play programmatically for iOS Safari compatibility
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented, try playing on user interaction or fail silently
        });
      }
    }
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
