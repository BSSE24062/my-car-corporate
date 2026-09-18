"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "@/lib/i18n";
import LoadingScreen from "@/components/LoadingScreen";
import MobileActionBar from "@/components/MobileActionBar";
import { Analytics } from "@vercel/analytics/next";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showVideoLoader, setShowVideoLoader] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    // Only show the 4.5s video loader on the main landing page ('/') on first session visit
    const hasSeenIntro = typeof window !== 'undefined' ? sessionStorage.getItem('elite_video_intro_seen') : null;
    const isHomePage = pathname === '/' || pathname === '';

    if (isHomePage && !hasSeenIntro) {
      setShowVideoLoader(true);
      const timer = setTimeout(() => {
        setShowVideoLoader(false);
        setIsReady(true);
        try {
          sessionStorage.setItem('elite_video_intro_seen', 'true');
        } catch {}
        if (typeof window !== 'undefined') {
          (window as unknown as { __ELITE_LOADING_FINISHED__?: boolean }).__ELITE_LOADING_FINISHED__ = true;
          window.dispatchEvent(new Event('loading-finished'));
        }
      }, 2800);
      return () => clearTimeout(timer);
    } else {
      setShowVideoLoader(false);
      setIsReady(true);
      if (typeof window !== 'undefined') {
        (window as unknown as { __ELITE_LOADING_FINISHED__?: boolean }).__ELITE_LOADING_FINISHED__ = true;
        window.dispatchEvent(new Event('loading-finished'));
      }
    }
  }, [pathname]);

  return (
    <>
      {showVideoLoader && <LoadingScreen />}
      <div style={{ opacity: (!isReady && showVideoLoader) ? 0 : 1, transition: 'opacity 0.4s ease-in' }}>
        {children}
      </div>
      <MobileActionBar />
      <Analytics />
    </>
  );
}
