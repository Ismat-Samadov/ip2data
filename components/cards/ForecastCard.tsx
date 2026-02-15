"use client";

import { CalendarDays } from "lucide-react";
import { WeatherData } from "@/lib/types";
import { getWeatherEmoji, getDayName } from "@/lib/utils";

interface Props {
  weather: WeatherData;
}

export default function ForecastCard({ weather }: Props) {
  const { daily } = weather;

  return (
    <div className="glass glass-hover rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
          <CalendarDays className="w-4 h-4 text-indigo-400" />
        </div>
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          7-Day Forecast
        </h2>
      </div>

      <div className="space-y-2">
        {daily.time.map((date, i) => {
          const high = Math.round(daily.temperature_2m_max[i]);
          const low = Math.round(daily.temperature_2m_min[i]);
          const emoji = getWeatherEmoji(daily.weather_code[i]);
          const dayName = getDayName(date);
          const allHighs = daily.temperature_2m_max;
          const allLows = daily.temperature_2m_min;
          const maxTemp = Math.max(...allHighs);
          const minTemp = Math.min(...allLows);
          const range = maxTemp - minTemp || 1;
          const barStart = ((low - minTemp) / range) * 100;
          const barWidth = ((high - low) / range) * 100;

          return (
            <div key={date} className="flex items-center gap-3 py-1.5">
              {/* Day */}
              <div className="w-16 text-sm text-slate-300 shrink-0">{dayName}</div>

              {/* Emoji */}
              <div className="text-lg shrink-0">{emoji}</div>

              {/* Temperature bar */}
              <div className="flex-1 relative h-1.5 bg-slate-800 rounded-full">
                <div
                  className="absolute h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-orange-400"
                  style={{ left: `${barStart}%`, width: `${barWidth}%` }}
                />
              </div>

              {/* Temps */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-slate-500 w-8 text-right">{low}°</span>
                <span className="text-sm font-semibold text-white w-8 text-right">{high}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
