"use client";

import { Droplets, Wind, Eye, Gauge, Thermometer } from "lucide-react";
import { WeatherData } from "@/lib/types";
import {
  getWeatherDescription,
  getWeatherEmoji,
  getWindDirection,
  getUVLabel,
  getVisibilityLabel,
} from "@/lib/utils";

interface Props {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: Props) {
  const c = weather.current;
  const isDay = c.is_day === 1;
  const emoji = getWeatherEmoji(c.weather_code, isDay);
  const desc = getWeatherDescription(c.weather_code);
  const uvInfo = getUVLabel(c.uv_index ?? 0);

  const stats = [
    { icon: Droplets, label: "Humidity", value: `${c.relative_humidity_2m}%`, color: "text-blue-400" },
    { icon: Wind, label: "Wind", value: `${c.wind_speed_10m} km/h ${getWindDirection(c.wind_direction_10m)}`, color: "text-slate-300" },
    { icon: Gauge, label: "Pressure", value: `${c.surface_pressure?.toFixed(0)} hPa`, color: "text-slate-300" },
    { icon: Eye, label: "Visibility", value: `${((c.visibility ?? 0) / 1000).toFixed(1)} km · ${getVisibilityLabel(c.visibility ?? 0)}`, color: "text-slate-300" },
  ];

  return (
    <div className="glass glass-hover rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center">
          <Thermometer className="w-4 h-4 text-sky-400" />
        </div>
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Current Weather
        </h2>
      </div>

      {/* Temperature hero */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-5xl font-bold text-white">
            {Math.round(c.temperature_2m)}°C
          </div>
          <div className="text-sm text-slate-400 mt-1">
            Feels like {Math.round(c.apparent_temperature)}°C
          </div>
          <div className="text-sm text-slate-300 mt-0.5">{desc}</div>
        </div>
        <div className="text-6xl select-none">{emoji}</div>
      </div>

      {/* UV Index badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs text-slate-400">UV Index</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 ${uvInfo.color}`}>
          {c.uv_index?.toFixed(1) ?? "—"} · {uvInfo.label}
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-slate-800/50 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Icon className={`w-3.5 h-3.5 ${color}`} />
              <span className="text-xs text-slate-400">{label}</span>
            </div>
            <div className="text-sm font-medium text-slate-200">{value}</div>
          </div>
        ))}
      </div>

      {/* Wind gusts */}
      {c.wind_gusts_10m > 0 && (
        <div className="mt-3 text-xs text-slate-500">
          Wind gusts up to <span className="text-slate-300">{c.wind_gusts_10m} km/h</span>
        </div>
      )}
    </div>
  );
}
