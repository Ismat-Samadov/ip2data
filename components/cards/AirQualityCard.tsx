"use client";

import { Wind } from "lucide-react";
import { AirQualityData } from "@/lib/types";
import { getAQILevel } from "@/lib/utils";

interface Props { airQuality: AirQualityData; }

function AQIGauge({ value, max = 300 }: { value: number; max?: number }) {
  const pct = Math.min((value / max) * 100, 100);
  // Circumference of r=15.9 circle ≈ 99.9; semi-arc = half
  const arcLen = 62.8; // half circumference (semi-circle)
  const stroke = (pct / 100) * arcLen;

  const color =
    value <= 50  ? "#10b981" :
    value <= 100 ? "#f59e0b" :
    value <= 150 ? "#f97316" :
    value <= 200 ? "#ef4444" : "#a855f7";

  return (
    <div className="relative w-32 h-20 mx-auto">
      <svg viewBox="0 0 36 20" className="w-full h-full">
        {/* Track */}
        <path d="M3 18 A15 15 0 0 1 33 18" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
        {/* Progress */}
        <path
          d="M3 18 A15 15 0 0 1 33 18"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${stroke} ${arcLen}`}
          style={{ transition: "stroke-dasharray 1s ease, stroke 0.3s" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
        <span className="text-2xl font-extrabold text-white leading-none tabular-nums">{Math.round(value)}</span>
        <span className="text-xs text-slate-500">AQI</span>
      </div>
    </div>
  );
}

export default function AirQualityCard({ airQuality }: Props) {
  const c = airQuality.current;
  const aqi   = c.us_aqi ?? c.european_aqi ?? 0;
  const level = getAQILevel(aqi);

  const pollutants = [
    { label: "PM2.5", value: c.pm2_5?.toFixed(1) ?? "—",                  unit: "μg/m³" },
    { label: "PM10",  value: c.pm10?.toFixed(1) ?? "—",                   unit: "μg/m³" },
    { label: "NO₂",   value: c.nitrogen_dioxide?.toFixed(1) ?? "—",       unit: "μg/m³" },
    { label: "O₃",    value: c.ozone?.toFixed(1) ?? "—",                  unit: "μg/m³" },
    { label: "CO",    value: (c.carbon_monoxide/1000).toFixed(2) ?? "—",  unit: "mg/m³" },
    { label: "EU AQI",value: c.european_aqi?.toFixed(0) ?? "—",           unit: "" },
  ];

  return (
    <div className="glass card-hover card-accent-emerald glow-emerald rounded-2xl p-5 h-full">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="card-icon bg-emerald-500/15">
          <Wind className="w-4 h-4 text-emerald-400" />
        </div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Air Quality
        </span>
      </div>

      {/* Gauge + level */}
      <div className="mb-4">
        <AQIGauge value={aqi} />
        <div className={`mt-2 text-center text-xs font-semibold py-1.5 rounded-lg ${level.bg} ${level.color} border border-white/5`}>
          {level.label}
        </div>
      </div>

      {/* Pollutant grid */}
      <div className="grid grid-cols-3 gap-2">
        {pollutants.map(({ label, value, unit }) => (
          <div key={label} className="stat-pill text-center">
            <div className="text-xs text-slate-500 mb-1">{label}</div>
            <div className="text-sm font-semibold text-slate-200 tabular-nums">{value}</div>
            {unit && <div className="text-xs text-slate-600 leading-none mt-0.5">{unit}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
