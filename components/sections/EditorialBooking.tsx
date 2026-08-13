"use client";

import React, {useState} from 'react';
import MagneticButton from '../ui/MagneticButton';

export default function EditorialBooking(){
  const [tab,setTab] = useState<'ptp'|'hourly'|'airport'>('ptp');

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10">
      <aside>
        <div className="flex gap-4 mb-6">
          <button onClick={()=>setTab('ptp')} className={`py-2 px-3 text-sm ${tab==='ptp'?'text-white':'muted'}`} data-cursor-magnetic>Point-to-Point</button>
          <button onClick={()=>setTab('hourly')} className={`py-2 px-3 text-sm ${tab==='hourly'?'text-white':'muted'}`} data-cursor-magnetic>Hourly</button>
          <button onClick={()=>setTab('airport')} className={`py-2 px-3 text-sm ${tab==='airport'?'text-white':'muted'}`} data-cursor-magnetic>Airport Transfer</button>
        </div>

        <div className="pb-6">
          <label className="block text-xs muted">Pick-up</label>
          <input className="w-full bg-transparent border-b border-white/20 py-2 text-sm" placeholder="Sydney CBD or venue" />
        </div>

        <div className="pb-6">
          <label className="block text-xs muted">Drop-off</label>
          <input className="w-full bg-transparent border-b border-white/20 py-2 text-sm" placeholder="Destination or notes" />
        </div>

        <div className="pb-6 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs muted">Passengers</label>
            <input className="w-full bg-transparent border-b border-white/20 py-2 text-sm" placeholder="e.g. 3" />
          </div>
          <div>
            <label className="block text-xs muted">Luggage</label>
            <input className="w-full bg-transparent border-b border-white/20 py-2 text-sm" placeholder="e.g. 2" />
          </div>
        </div>

        <div className="pt-6">
          <MagneticButton onClick={()=>alert('Request sent')} className="thin-border">Request Concierge</MagneticButton>
        </div>
      </aside>

      <div className="prose max-w-none text-white/90">
        {tab==='ptp' && (
          <div>
            <h3 className="display-syne text-2xl">Point-to-Point</h3>
            <p className="muted">A curated transfer with professional chauffeur, city permit and priority routing. Discreet billing and bespoke extras upon request.</p>
          </div>
        )}
        {tab==='hourly' && (
          <div>
            <h3 className="display-syne text-2xl">Hourly</h3>
            <p className="muted">Reserve a vehicle and chauffeur by the hour — ideal for events, rounds of meetings, or staged pick-ups.</p>
          </div>
        )}
        {tab==='airport' && (
          <div>
            <h3 className="display-syne text-2xl">Airport Transfer</h3>
            <p className="muted">Meet & greet at arrivals, flight tracking, priority lanes and luggage handling included.</p>
          </div>
        )}
      </div>
    </div>
  );
}
