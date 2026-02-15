"use client";

import { Droplets, Wind, Eye, Gauge, Thermometer } from "lucide-react";
import { WeatherData } from "@/lib/types";
import {
  getWeatherDescription, getWeatherEmoji,
  getWindDirection, getUVLabel, getVisibilityLabel,
} from "@/lib/utils";

interface Props { weather: WeatherData; }

export default function WeatherCard({ weather }: Props) {
  const c = weather.current;
  const isDay = c.is_day === 1;
  const emoji = getWeatherEmoji(c.weather_code, isDay);
  const desc  = getWeatherDescription(c.weather_code);
  const uv    = getUVLabel(c.uv_index ?? 0);

  const stats = [
    { icon: Droplets, label: "Humidity",   value: `${c.relative_humidity_2m}%`,                                   color: "text-blue-400"  },
    { icon: Wind,     label: "Wind",       value: `${c.wind_speed_10m} km/h ${getWindDirection(c.wind_direction_10m)}`, color: "text-slate-300" },
    { icon: Gauge,    label: "Pressure",   value: `${c.surface_pressure?.toFixed(0)} hPa`,                        color: "text-slate-300" },
    { icon: Eye,      label: "Visibility", value: `${((c.visibility ?? 0) / 1000).toFixed(1)} km`,                color: "text-slate-300" },
  ];

  return (
    <div className="glass card-hover card-accent-sky glow-sky rounded-2xl p-5 h-full">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="card-icon bg-sky-500/15">
          <Thermometer className="w-4 h-4 text-sky-400" />
        </div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Current Weather
        </span>
      </div>

      {/* Temperature hero */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-5xl font-extrabold text-white leading-none tabular-nums">
            {Math.round(c.temperature_2m)}°
            <span className="text-2xl font-semibold text-slate-400">C</span>
          </div>
          <div className="text-sm text-slate-400 mt-1.5">{desc}</div>
          <div className="text-xs text-slate-500 mt-0.5">
            Feels like {Math.round(c.apparent_temperature)}°C
          </div>
        </div>
        <div className="text-6xl select-none drop-shadow-sm" aria-hidden>{emoji}</div>
      </div>

      {/* UV + visibility labels */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg bg-slate-800/70 border border-white/5 ${uv.color}`}>
          UV {c.uv_index?.toFixed(1) ?? "—"} &middot; {uv.label}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg bg-slate-800/70 border border-white/5 text-slate-400">
          <Eye className="w-3 h-3" /> {getVisibilityLabel(c.visibility ?? 0)}
        </span>
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-2 gap-2">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="stat-pill">
            <div className="flex items-center gap-1.5 mb-1">
              <Icon className={`w-3.5 h-3.5 ${color} shrink-0`} />
              <span className="text-xs text-slate-500">{label}</span>
            </div>
            <div className="text-sm font-medium text-slate-200 leading-tight">{value}</div>
          </div>
        ))}
      </div>

      {c.wind_gusts_10m > 0 && (
        <p className="mt-3 text-xs text-slate-600">
          Gusts up to <span className="text-slate-400">{c.wind_gusts_10m} km/h</span>
        </p>
      )}
    </div>
  );
}
