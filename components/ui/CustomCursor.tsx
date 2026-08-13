"use client";

import React, {useEffect, useRef} from 'react';
import gsap from 'gsap';

export default function CustomCursor(){
  const dot = useRef<HTMLDivElement|null>(null);
  const ring = useRef<HTMLDivElement|null>(null);
  const mouse = useRef({x:0,y:0});
  const pos = useRef({x:0,y:0});

  useEffect(()=>{
    const onMove = (e:MouseEvent)=>{
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if(dot.current) gsap.to(dot.current,{x:mouse.current.x,y:mouse.current.y,duration:0.12,ease:'power2'});
    };

    const loop = ()=>{
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12;
      if(ring.current) gsap.set(ring.current,{x:pos.current.x,y:pos.current.y});
      requestAnimationFrame(loop);
    };

    function handleEnter(e:Event){
      const target = e.target as HTMLElement;
      if(ring.current) gsap.to(ring.current,{scale:1.8,opacity:0.9,duration:0.35});
      if(dot.current) gsap.to(dot.current,{scale:0.65,duration:0.25});
    }
    function handleLeave(e:Event){
      if(ring.current) gsap.to(ring.current,{scale:1,opacity:0.6,duration:0.35});
      if(dot.current) gsap.to(dot.current,{scale:1,duration:0.25});
    }

    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('[data-cursor-magnetic]').forEach(el=>{
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    requestAnimationFrame(loop);

    return ()=>{
      window.removeEventListener('mousemove', onMove);
      document.querySelectorAll('[data-cursor-magnetic]').forEach(el=>{
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  },[]);

  return (
    <div aria-hidden>
      <div ref={ring} style={{position:'fixed',left:0,top:0,width:48,height:48,borderRadius:999,transform:'translate(-50%,-50%)',pointerEvents:'none',background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',backdropFilter:'blur(2px)',zIndex:9999,opacity:0.6}} />
      <div ref={dot} style={{position:'fixed',left:0,top:0,width:8,height:8,borderRadius:999,transform:'translate(-50%,-50%)',pointerEvents:'none',background:'#F4F4F6',zIndex:10000,boxShadow:'0 0 12px rgba(0,0,0,0.4)'}} />
    </div>
  );
}
