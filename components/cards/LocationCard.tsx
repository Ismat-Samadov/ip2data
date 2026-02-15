"use client";

import { MapPin, Clock, Map, Compass } from "lucide-react";
import { GeoData } from "@/lib/types";

interface Props {
  geo: GeoData;
}

export default function LocationCard({ geo }: Props) {
  const localTime = new Date().toLocaleTimeString("en-US", {
    timeZone: geo.timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  const localDate = new Date().toLocaleDateString("en-US", {
    timeZone: geo.timezone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="glass glass-hover rounded-2xl p-5 glow-purple">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
          <MapPin className="w-4 h-4 text-purple-400" />
        </div>
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Location
        </h2>
      </div>

      {/* City + Country Hero */}
      <div className="mb-4">
        <div className="text-2xl font-bold text-white">{geo.city}</div>
        <div className="text-sm text-slate-400">
          {geo.regionName}, {geo.country}
        </div>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-400">Local Time</span>
          </div>
          <span className="text-sm font-semibold text-purple-300 font-mono">{localTime}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Map className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-400">Date</span>
          </div>
          <span className="text-xs text-slate-300">{localDate}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-400">Coordinates</span>
          </div>
          <span className="text-xs font-mono text-slate-300">
            {geo.lat.toFixed(4)}, {geo.lon.toFixed(4)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-400">Timezone</span>
          </div>
          <span className="text-xs text-slate-300">{geo.timezone}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-400">ZIP Code</span>
          </div>
          <span className="text-xs font-mono text-slate-300">{geo.zip || "—"}</span>
        </div>
      </div>
    </div>
  );
}
