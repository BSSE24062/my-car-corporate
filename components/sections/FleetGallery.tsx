"use client";

import React, {useEffect, useRef} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FLEET = [
  {title:'MERCEDES S-CLASS', spec:'3 PASSENGERS • 2 LUGGAGE', image:'/vehicles/s-class.webp'},
  {title:'MERCEDES V-CLASS', spec:'6 PASSENGERS • 4 LUGGAGE', image:'/vehicles/v-class.webp'},
  {title:'SPRINTER EXECUTIVE', spec:'10 PASSENGERS • 8 LUGGAGE', image:'/vehicles/sprinter.webp'},
];

export default function FleetGallery(){
  const ref = useRef<HTMLDivElement|null>(null);

  useEffect(()=>{
    const container = ref.current!;
    const panels = container.querySelectorAll('.panel');
    const total = panels.length;
    const width = container.scrollWidth - window.innerWidth;

    gsap.to(panels,{
      x: (i:number)=>`-${(container.scrollWidth - window.innerWidth) * (i/(total-1))}px`,
      ease: 'none',
      scrollTrigger:{
        trigger:container,
        start:'top top',
        end: ()=> `+=${container.scrollWidth}`,
        scrub: true,
        pin: true,
        invalidateOnRefresh:true
      }
    });

    return ()=> ScrollTrigger.getAll().forEach(t=>t.kill());
  },[]);

  return (
    <section className="w-full">
      <div ref={ref} className="flex w-[300vw] h-screen items-stretch">
        {FLEET.map((v,i)=> (
          <div key={i} className="panel relative flex-1 h-full flex items-end" style={{minWidth:'100vw'}}>
            <div className="absolute inset-0 bg-black/40" />
            <img src={v.image} alt={v.title} className="object-cover w-full h-full block" />
            <div className="relative z-10 p-12 max-w-xl">
              <div className="display-syne text-2xl tracking-wider" style={{color:'#D1C7BD'}}>{v.title}</div>
              <div className="muted mt-2">{v.spec}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
