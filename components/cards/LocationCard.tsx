"use client";

import { useEffect, useState } from "react";
import { MapPin, Clock, Compass, Globe2 } from "lucide-react";
import { GeoData } from "@/lib/types";

interface Props { geo: GeoData; }

export default function LocationCard({ geo }: Props) {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString("en-US", {
      timeZone: geo.timezone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
    })
  );

  // Live clock — ticks every second
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", {
        timeZone: geo.timezone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
      }));
    }, 1000);
    return () => clearInterval(id);
  }, [geo.timezone]);

  const localDate = new Date().toLocaleDateString("en-US", {
    timeZone: geo.timezone, weekday: "long", month: "short", day: "numeric",
  });

  return (
    <div className="glass card-hover card-accent-purple glow-purple rounded-2xl p-5 h-full">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="card-icon bg-purple-500/15">
          <MapPin className="w-4 h-4 text-purple-400" />
        </div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Location
        </span>
      </div>

      {/* City hero */}
      <div className="mb-5 p-3.5 rounded-xl bg-purple-500/8 border border-purple-500/15">
        <div className="text-2xl font-bold text-white leading-tight">{geo.city}</div>
        <div className="text-sm text-slate-400 mt-0.5">
          {geo.regionName}, {geo.country}
        </div>
        {/* Live clock */}
        <div className="mt-3 flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span className="font-mono text-base font-semibold text-purple-300 tabular-nums">
            {time}
          </span>
        </div>
        <div className="text-xs text-slate-500 mt-0.5 pl-[22px]">{localDate}</div>
      </div>

      {/* Detail rows */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-xs text-slate-500">Coordinates</span>
          </div>
          <span className="font-mono text-xs text-slate-300">
            {geo.lat.toFixed(4)}, {geo.lon.toFixed(4)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Globe2 className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-xs text-slate-500">Timezone</span>
          </div>
          <span className="text-xs text-slate-300 text-right">{geo.timezone}</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-xs text-slate-500">ZIP / Postal</span>
          </div>
          <span className="font-mono text-xs text-slate-300">{geo.zip || "—"}</span>
        </div>
      </div>
    </div>
  );
}
