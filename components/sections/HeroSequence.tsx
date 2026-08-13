"use client";

import React, {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 150;
const pad = (n:number, width=3) => String(n).padStart(width,'0');

export default function HeroSequence(){
  const canvasRef = useRef<HTMLCanvasElement|null>(null);
  const containerRef = useRef<HTMLDivElement|null>(null);
  const [loaded, setLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(()=>{
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let width=0,height=0;

    // preload images
    const images:HTMLImageElement[] = [];
    let loadedCount=0;
    for(let i=1;i<=FRAME_COUNT;i++){
      const img = new Image();
      const index = pad(i,3);
      img.src = `/sequence/frame_${index}.webp`;
      img.onload = ()=>{
        loadedCount++; if(loadedCount===FRAME_COUNT) setLoaded(true);
      };
      images.push(img);
    }
    imagesRef.current = images;

    function fitCanvas(){
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
    }
    fitCanvas();
    window.addEventListener('resize', fitCanvas);

    // draw initial frame
    const drawFrame = (index:number)=>{
      const img = imagesRef.current[index];
      if(!img || !ctx) return;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      // cover fit
      const iw = img.width, ih = img.height;
      const r = Math.max(window.innerWidth/iw, window.innerHeight/ih);
      const nw = iw * r, nh = ih * r;
      const x = (window.innerWidth - nw)/2; const y = (window.innerHeight - nh)/2;
      ctx.drawImage(img, x, y, nw, nh);
    };

    // GSAP scroll driven frame scrub
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=200%',
      scrub: true,
      pin: true,
      onUpdate: self=>{
        const progress = self.progress;
        const frameIndex = Math.min(FRAME_COUNT-1, Math.floor(progress * (FRAME_COUNT-1)));
        drawFrame(frameIndex);
      }
    });

    return ()=>{
      window.removeEventListener('resize', fitCanvas);
      ScrollTrigger.getAll().forEach(s=>s.kill());
    };
  },[]);

  useEffect(()=>{
    if(!loaded) return;
    // animate overlay text tied to scroll
    const title = containerRef.current!.querySelector('.hero-head') as HTMLElement;
    gsap.fromTo(title,{y:30,opacity:0},{y:0,opacity:1,duration:1,scrollTrigger:{trigger:containerRef.current,start:'top top',end:'+=100%',scrub:true}});
  },[loaded]);

  return (
    <section ref={containerRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center px-6">
            <h1 className="hero-head display-syne text-[clamp(2.5rem,6vw,6rem)] leading-tight text-white/95">MYCAR CORPORATES</h1>
            <p className="mt-4 muted max-w-xl mx-auto">Bespoke chauffeur service for Sydney — discreet, precise, and immaculately presented.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
