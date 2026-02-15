"use client";

import { CalendarDays } from "lucide-react";
import { WeatherData } from "@/lib/types";
import { getWeatherEmoji, getDayName } from "@/lib/utils";

interface Props { weather: WeatherData; }

export default function ForecastCard({ weather }: Props) {
  const { daily } = weather;
  const maxTemp = Math.max(...daily.temperature_2m_max);
  const minTemp = Math.min(...daily.temperature_2m_min);
  const range   = maxTemp - minTemp || 1;

  return (
    <div className="glass card-hover card-accent-indigo glow-indigo rounded-2xl p-5 h-full">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="card-icon bg-indigo-500/15">
          <CalendarDays className="w-4 h-4 text-indigo-400" />
        </div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          7-Day Forecast
        </span>
      </div>

      <div className="space-y-1">
        {daily.time.map((date, i) => {
          const high = Math.round(daily.temperature_2m_max[i]);
          const low  = Math.round(daily.temperature_2m_min[i]);
          const emoji = getWeatherEmoji(daily.weather_code[i]);
          const day   = getDayName(date);
          const precip = daily.precipitation_sum[i];
          const barStart = ((low - minTemp) / range) * 100;
          const barWidth = ((high - low)  / range) * 100;
          const isToday = i === 0;

          return (
            <div
              key={date}
              className={`flex items-center gap-3 px-2 py-2.5 rounded-xl transition-colors ${
                isToday ? "bg-white/4" : "hover:bg-white/2"
              }`}
            >
              {/* Day name */}
              <div className={`w-14 shrink-0 text-sm ${isToday ? "font-semibold text-white" : "text-slate-400"}`}>
                {day}
              </div>

              {/* Emoji */}
              <div className="text-base shrink-0 w-6 text-center">{emoji}</div>

              {/* Precip dot */}
              {precip > 0.5 ? (
                <div className="w-1 h-1 rounded-full bg-blue-400/70 shrink-0" title={`${precip}mm`} />
              ) : (
                <div className="w-1 shrink-0" />
              )}

              {/* Temp bar */}
              <div className="flex-1 relative h-1.5 bg-slate-800 rounded-full mx-1">
                <div
                  className="absolute h-1.5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400"
                  style={{ left: `${barStart}%`, width: `${Math.max(barWidth, 4)}%` }}
                />
              </div>

              {/* Temperatures */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-slate-600 w-7 text-right tabular-nums">{low}°</span>
                <span className={`text-sm font-semibold w-8 text-right tabular-nums ${isToday ? "text-white" : "text-slate-300"}`}>
                  {high}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
