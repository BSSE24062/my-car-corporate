"use client";

import React, { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="loader-wrapper">
      {isMounted && (
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/loading.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default LoadingScreen;
