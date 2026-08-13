"use client";

import React from 'react';

const EXPERIENCES = [
  {title:'SYD Airport Transfer', desc:'Meet & greet service with luggage assistance and flight monitoring for seamless arrivals.'},
  {title:'Opera House Arrival', desc:'Curated chauffeur drop-offs with prime vantage and private valet coordination.'},
  {title:'Hunter Valley Escape', desc:'Long-form transfer with chilled wines, privacy screens and on-board refreshments.'}
];

export default function SydneyExperience(){
  return (
    <div className="grid md:grid-cols-3 gap-8 mt-8">
      {EXPERIENCES.map((e,i)=> (
        <article key={i} className="bg-gradient-to-b from-transparent to-black/20 p-6 thin-border">
          <h4 className="display-syne text-lg" style={{color:'#E5E5EA'}}>{e.title}</h4>
          <p className="muted mt-2">{e.desc}</p>
          <div className="mt-4 text-xs muted">Private transfers available 24/7 • Premium meet & greet</div>
        </article>
      ))}
    </div>
  );
}
