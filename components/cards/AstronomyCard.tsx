"use client";

import { Sun, Sunset, Moon, Clock } from "lucide-react";
import { WeatherData } from "@/lib/types";
import { formatTime, formatDaylight } from "@/lib/utils";

interface Props {
  weather: WeatherData;
}

export default function AstronomyCard({ weather }: Props) {
  const { daily } = weather;
  const sunrise = daily.sunrise[0];
  const sunset = daily.sunset[0];
  const daylight = daily.daylight_duration[0];

  // Calculate sun arc progress
  const nowMs = Date.now();
  const sunriseMs = new Date(sunrise).getTime();
  const sunsetMs = new Date(sunset).getTime();
  const progress = Math.max(
    0,
    Math.min(1, (nowMs - sunriseMs) / (sunsetMs - sunriseMs))
  );
  const isDay = nowMs >= sunriseMs && nowMs <= sunsetMs;

  // Arc geometry (semicircle)
  const arcAngle = progress * 180;
  const rad = ((arcAngle - 180) * Math.PI) / 180;
  const cx = 50 + 40 * Math.cos(rad);
  const cy = 50 + 40 * Math.sin(rad);

  return (
    <div className="glass glass-hover rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
          <Sun className="w-4 h-4 text-amber-400" />
        </div>
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Sun & Astronomy
        </h2>
      </div>

      {/* Sun arc */}
      <div className="relative mb-4">
        <svg viewBox="0 0 100 55" className="w-full">
          {/* Horizon line */}
          <line x1="5" y1="50" x2="95" y2="50" stroke="#334155" strokeWidth="1" />
          {/* Arc path */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#1e293b"
            strokeWidth="2"
          />
          {/* Progress arc */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="url(#sunGrad)"
            strokeWidth="2"
            strokeDasharray={`${progress * 125.7} 125.7`}
          />
          <defs>
            <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
          {/* Sun dot */}
          {isDay && (
            <circle cx={cx} cy={cy} r="3.5" fill="#fbbf24">
              <animate attributeName="r" values="3.5;4.5;3.5" dur="2s" repeatCount="indefinite" />
            </circle>
          )}
          {/* Moon (if night) */}
          {!isDay && (
            <text x="47" y="38" fontSize="10" textAnchor="middle" fill="#94a3b8">🌙</text>
          )}
          {/* Labels */}
          <text x="10" y="54" fontSize="5" fill="#64748b" textAnchor="middle">↑</text>
          <text x="90" y="54" fontSize="5" fill="#64748b" textAnchor="middle">↓</text>
        </svg>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-slate-800/50 rounded-xl p-3 text-center">
          <Sun className="w-4 h-4 text-amber-400 mx-auto mb-1" />
          <div className="text-xs text-slate-400 mb-0.5">Sunrise</div>
          <div className="text-sm font-semibold text-slate-200">{formatTime(sunrise)}</div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-3 text-center">
          <Clock className="w-4 h-4 text-sky-400 mx-auto mb-1" />
          <div className="text-xs text-slate-400 mb-0.5">Daylight</div>
          <div className="text-sm font-semibold text-slate-200">{formatDaylight(daylight)}</div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-3 text-center">
          <Sunset className="w-4 h-4 text-orange-400 mx-auto mb-1" />
          <div className="text-xs text-slate-400 mb-0.5">Sunset</div>
          <div className="text-sm font-semibold text-slate-200">{formatTime(sunset)}</div>
        </div>
      </div>
    </div>
  );
}
