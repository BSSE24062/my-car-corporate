"use client";

import React, {useEffect, useRef} from 'react';
import './globals.css';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from '../components/ui/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

export default function RootLayout({children}:{children:React.ReactNode}){
  const lenis = useRef<any>(null);

  useEffect(()=>{
    if(typeof window === 'undefined') return;
    lenis.current = new Lenis({duration:1.2,easing:(t:number)=>1-Math.pow(1-t,3)});

    function raf(time:number){
      lenis.current.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // make GSAP ScrollTrigger sync with Lenis
    lenis.current.on('scroll', ScrollTrigger.update);

    return ()=>{
      lenis.current.destroy && lenis.current.destroy();
      ScrollTrigger.clearScrollMemory && ScrollTrigger.clearScrollMemory();
    };
  },[]);

  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-[#070708] to-[#0E0E10]">
        <div id="lenis-wrapper">
          <main>
            {children}
          </main>
        </div>

        <div aria-hidden className="pointer-events-none fixed inset-0 mix-blend-overlay" style={{opacity:0.02}} />

        <CustomCursor />
      </body>
    </html>
  );
}
