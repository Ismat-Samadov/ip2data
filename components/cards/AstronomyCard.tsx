"use client";

import { Sun, Sunset, Clock } from "lucide-react";
import { WeatherData } from "@/lib/types";
import { formatTime, formatDaylight } from "@/lib/utils";

interface Props { weather: WeatherData; }

export default function AstronomyCard({ weather }: Props) {
  const { daily } = weather;
  const sunrise = daily.sunrise[0];
  const sunset  = daily.sunset[0];
  const daylight = daily.daylight_duration[0];

  const nowMs      = Date.now();
  const sunriseMs  = new Date(sunrise).getTime();
  const sunsetMs   = new Date(sunset).getTime();
  const progress   = Math.max(0, Math.min(1, (nowMs - sunriseMs) / (sunsetMs - sunriseMs)));
  const isDay      = nowMs >= sunriseMs && nowMs <= sunsetMs;

  // Sun position on arc (viewBox 0 0 100 56)
  const angle = progress * Math.PI; // 0 = left, PI = right
  const sunX  = 10 + 80 * (1 - Math.cos(angle)) / 2;    // left=10, right=90
  const sunY  = 50 - 38 * Math.sin(angle);               // horizon=50, peak=12

  return (
    <div className="glass card-hover card-accent-amber glow-amber rounded-2xl p-5 h-full">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="card-icon bg-amber-500/15">
          <Sun className="w-4 h-4 text-amber-400" />
        </div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Sun &amp; Astronomy
        </span>
      </div>

      {/* Arc */}
      <div className="mb-5 px-2">
        <svg viewBox="0 0 100 56" className="w-full" aria-hidden>
          <defs>
            <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#f97316" stopOpacity="0.6" />
              <stop offset="50%"  stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Ground line */}
          <line x1="5" y1="50" x2="95" y2="50" stroke="#334155" strokeWidth="0.5" />

          {/* Full arc track */}
          <path
            d="M10 50 A40 40 0 0 1 90 50"
            fill="none"
            stroke="#1e293b"
            strokeWidth="1.5"
          />

          {/* Elapsed arc */}
          <path
            d="M10 50 A40 40 0 0 1 90 50"
            fill="none"
            stroke="url(#arcGrad)"
            strokeWidth="1.5"
            strokeDasharray={`${progress * 125.7} 125.7`}
          />

          {/* Sun / Moon */}
          {isDay ? (
            <circle cx={sunX} cy={sunY} r="4" fill="#fbbf24" className="drop-shadow-sm">
              <animate attributeName="r" values="3.5;4.5;3.5" dur="3s" repeatCount="indefinite" />
            </circle>
          ) : (
            <text x="50" y="28" textAnchor="middle" fontSize="9" fill="#94a3b8">🌙</text>
          )}

          {/* Horizon labels */}
          <text x="10" y="54" fontSize="4" fill="#475569" textAnchor="middle">↑ Rise</text>
          <text x="90" y="54" fontSize="4" fill="#475569" textAnchor="middle">Set ↓</text>
        </svg>

        {/* Progress label */}
        <p className="text-center text-xs text-slate-500 -mt-1">
          {isDay
            ? `${Math.round(progress * 100)}% of daylight passed`
            : "Currently night"}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="stat-pill text-center">
          <Sun className="w-3.5 h-3.5 text-amber-400 mx-auto mb-1.5" />
          <div className="text-xs text-slate-500 mb-0.5">Sunrise</div>
          <div className="text-sm font-semibold text-slate-200">{formatTime(sunrise)}</div>
        </div>

        <div className="stat-pill text-center">
          <Clock className="w-3.5 h-3.5 text-sky-400 mx-auto mb-1.5" />
          <div className="text-xs text-slate-500 mb-0.5">Daylight</div>
          <div className="text-sm font-semibold text-slate-200">{formatDaylight(daylight)}</div>
        </div>

        <div className="stat-pill text-center">
          <Sunset className="w-3.5 h-3.5 text-orange-400 mx-auto mb-1.5" />
          <div className="text-xs text-slate-500 mb-0.5">Sunset</div>
          <div className="text-sm font-semibold text-slate-200">{formatTime(sunset)}</div>
        </div>
      </div>
    </div>
  );
}
