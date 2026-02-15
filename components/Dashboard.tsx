"use client";

import { RefreshCcw, ExternalLink } from "lucide-react";
import { DashboardData } from "@/lib/types";
import IPNetworkCard from "./cards/IPNetworkCard";
import LocationCard from "./cards/LocationCard";
import WeatherCard from "./cards/WeatherCard";
import ForecastCard from "./cards/ForecastCard";
import AirQualityCard from "./cards/AirQualityCard";
import AstronomyCard from "./cards/AstronomyCard";
import CountryCard from "./cards/CountryCard";

interface Props {
  data: DashboardData;
  onRefresh: () => void;
  refreshing: boolean;
}

export default function Dashboard({ data, onRefresh, refreshing }: Props) {
  const { ip, geo, weather, airQuality, country } = data;
  const isDay = weather.current.is_day === 1;

  return (
    <div className="min-h-screen">
      {/* Background gradient */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: isDay
            ? "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(59,130,246,0.12) 0%, transparent 70%), #020817"
            : "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(99,63,200,0.12) 0%, transparent 70%), #020817",
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-20 glass border-b border-slate-800/60 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm">
              🌐
            </div>
            <span className="font-bold text-white text-lg tracking-tight">IP2Data</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs text-slate-500">
              {geo.city}, {geo.countryCode}
            </span>
            <button
              onClick={onRefresh}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors disabled:opacity-50"
            >
              <RefreshCcw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Hero banner */}
      <section className="max-w-7xl mx-auto px-4 pt-8 pb-4">
        <div className="glass rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-slate-400 text-sm mb-1">Your public IP address</p>
              <div className="font-mono text-3xl sm:text-4xl font-bold gradient-text break-all">
                {ip.ip}
              </div>
              <p className="text-slate-400 text-sm mt-2">
                {geo.city}, {geo.regionName}, {geo.country} &middot;{" "}
                <span className="text-slate-500">{geo.timezone}</span>
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-1">
              <div className="text-4xl">{isDay ? "☀️" : "🌙"}</div>
              <div className="text-2xl font-bold text-white">
                {Math.round(weather.current.temperature_2m)}°C
              </div>
              <div className="text-sm text-slate-400">{geo.isp}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main grid */}
      <main className="max-w-7xl mx-auto px-4 pb-12">
        {/* Row 1: IP + Location + Weather */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <IPNetworkCard ip={ip} geo={geo} />
          <LocationCard geo={geo} />
          <WeatherCard weather={weather} />
        </div>

        {/* Row 2: Forecast + Air Quality + Astronomy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <ForecastCard weather={weather} />
          <AirQualityCard airQuality={airQuality} />
          <AstronomyCard weather={weather} />
        </div>

        {/* Row 3: Country (full width on mobile, 1/3 on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CountryCard country={country} />

          {/* Fun stats card */}
          <div className="glass glass-hover rounded-2xl p-5 sm:col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center text-sm">
                📊
              </div>
              <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                Quick Stats
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { label: "Temperature", value: `${Math.round(weather.current.temperature_2m)}°C`, emoji: "🌡️" },
                { label: "Humidity", value: `${weather.current.relative_humidity_2m}%`, emoji: "💧" },
                { label: "Wind Speed", value: `${weather.current.wind_speed_10m} km/h`, emoji: "💨" },
                { label: "Precipitation", value: `${weather.current.precipitation} mm`, emoji: "🌧️" },
                { label: "Cloud Cover", value: `${weather.current.cloud_cover}%`, emoji: "☁️" },
                { label: "UV Index", value: `${weather.current.uv_index?.toFixed(1) ?? "—"}`, emoji: "🌞" },
                { label: "Pressure", value: `${weather.current.surface_pressure?.toFixed(0)} hPa`, emoji: "🔵" },
                { label: "US AQI", value: `${airQuality.current.us_aqi ?? "—"}`, emoji: "🌿" },
              ].map(({ label, value, emoji }) => (
                <div key={label} className="bg-slate-800/40 rounded-xl p-3">
                  <div className="text-lg mb-1">{emoji}</div>
                  <div className="text-xs text-slate-400 mb-0.5">{label}</div>
                  <div className="text-sm font-semibold text-slate-200">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span>IP2Data — Built with Next.js & free APIs</span>
          <div className="flex items-center gap-4">
            {[
              { label: "ipify.org", href: "https://www.ipify.org" },
              { label: "ip-api.com", href: "https://ip-api.com" },
              { label: "open-meteo.com", href: "https://open-meteo.com" },
              { label: "restcountries.com", href: "https://restcountries.com" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-slate-400 transition-colors"
              >
                {label}
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
