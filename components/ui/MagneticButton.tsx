"use client";

import React, {useRef, useEffect} from 'react';
import gsap from 'gsap';

export default function MagneticButton({children, className, onClick}:{children:React.ReactNode;className?:string;onClick?:()=>void}){
  const ref = useRef<HTMLButtonElement|null>(null);

  useEffect(()=>{
    const el = ref.current; if(!el) return;

    function enter(e:MouseEvent){
      gsap.to(el,{scale:1.02,duration:0.4,ease:'power3.out'});
    }
    function leave(){
      gsap.to(el,{scale:1,duration:0.5,ease:'elastic.out(1,0.4)'});
      gsap.to(el,{x:0,y:0,duration:0.6,ease:'power3.out'});
    }
    function move(e:MouseEvent){
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width/2)) * 0.12;
      const dy = (e.clientY - (rect.top + rect.height/2)) * 0.12;
      gsap.to(el,{x:dx,y:dy,duration:0.4,ease:'power3.out'});
    }

    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
    el.addEventListener('mousemove', move);

    return ()=>{
      el.removeEventListener('mouseenter', enter);
      el.removeEventListener('mouseleave', leave);
      el.removeEventListener('mousemove', move);
    };
  },[]);

  return (
    <button ref={ref} data-cursor-magnetic className={`py-3 px-6 bg-transparent border border-white/6 text-sm rounded-none tracking-wider ${className||''}`} onClick={onClick}>
      {children}
    </button>
  );
}
