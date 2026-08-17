import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="loader-wrapper">
      <video
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/loading.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default LoadingScreen;
