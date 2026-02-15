"use client";

import { Wind } from "lucide-react";
import { AirQualityData } from "@/lib/types";
import { getAQILevel } from "@/lib/utils";

interface Props {
  airQuality: AirQualityData;
}

function AQIGauge({ value, max = 300 }: { value: number; max?: number }) {
  const pct = Math.min((value / max) * 100, 100);
  const color =
    value <= 50
      ? "#10b981"
      : value <= 100
      ? "#f59e0b"
      : value <= 150
      ? "#f97316"
      : value <= 200
      ? "#ef4444"
      : "#a855f7";

  return (
    <div className="relative w-28 h-28 mx-auto">
      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1e293b" strokeWidth="3" />
        <circle
          cx="18"
          cy="18"
          r="15.9"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={`${pct} ${100 - pct}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{Math.round(value)}</span>
        <span className="text-xs text-slate-400">AQI</span>
      </div>
    </div>
  );
}

export default function AirQualityCard({ airQuality }: Props) {
  const c = airQuality.current;
  const aqi = c.us_aqi ?? c.european_aqi ?? 0;
  const level = getAQILevel(aqi);

  const pollutants = [
    { label: "PM2.5", value: c.pm2_5?.toFixed(1) ?? "—", unit: "μg/m³" },
    { label: "PM10", value: c.pm10?.toFixed(1) ?? "—", unit: "μg/m³" },
    { label: "NO₂", value: c.nitrogen_dioxide?.toFixed(1) ?? "—", unit: "μg/m³" },
    { label: "O₃", value: c.ozone?.toFixed(1) ?? "—", unit: "μg/m³" },
    { label: "CO", value: (c.carbon_monoxide / 1000)?.toFixed(2) ?? "—", unit: "mg/m³" },
    { label: "EU AQI", value: c.european_aqi?.toFixed(0) ?? "—", unit: "" },
  ];

  return (
    <div className="glass glass-hover rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
          <Wind className="w-4 h-4 text-emerald-400" />
        </div>
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Air Quality
        </h2>
      </div>

      {/* Gauge */}
      <AQIGauge value={aqi} />

      <div className={`text-center mt-2 mb-4 text-sm font-semibold px-3 py-1 rounded-full inline-block mx-auto w-full ${level.color} ${level.bg}`}>
        {level.label}
      </div>

      {/* Pollutants grid */}
      <div className="grid grid-cols-3 gap-2">
        {pollutants.map(({ label, value, unit }) => (
          <div key={label} className="bg-slate-800/50 rounded-xl p-2.5 text-center">
            <div className="text-xs text-slate-400 mb-1">{label}</div>
            <div className="text-sm font-semibold text-slate-200">{value}</div>
            {unit && <div className="text-xs text-slate-500">{unit}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
