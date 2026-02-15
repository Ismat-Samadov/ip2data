"use client";

import { RefreshCcw, ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";
import { DashboardData } from "@/lib/types";
import { getWeatherDescription, getWeatherEmoji } from "@/lib/utils";
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
  const [copied, setCopied] = useState(false);

  const copyIP = () => {
    navigator.clipboard.writeText(ip.ip).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const quickStats = [
    { label: "Temperature", value: `${Math.round(weather.current.temperature_2m)}°C`, icon: "🌡️", accent: "text-sky-300" },
    { label: "Humidity",    value: `${weather.current.relative_humidity_2m}%`,          icon: "💧", accent: "text-blue-300" },
    { label: "Wind",        value: `${weather.current.wind_speed_10m} km/h`,            icon: "💨", accent: "text-slate-300" },
    { label: "Precip",      value: `${weather.current.precipitation} mm`,               icon: "🌧️", accent: "text-indigo-300" },
    { label: "Cloud Cover", value: `${weather.current.cloud_cover}%`,                   icon: "☁️", accent: "text-slate-300" },
    { label: "UV Index",    value: `${weather.current.uv_index?.toFixed(1) ?? "—"}`,    icon: "🌞", accent: "text-amber-300" },
    { label: "Pressure",    value: `${weather.current.surface_pressure?.toFixed(0)} hPa`, icon: "🔵", accent: "text-slate-300" },
    { label: "US AQI",      value: `${airQuality.current.us_aqi ?? "—"}`,               icon: "🌿", accent: "text-emerald-300" },
  ];

  return (
    <div className="min-h-screen">
      {/* ── Ambient background ── */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: isDay
            ? `radial-gradient(ellipse 90% 55% at 50% -10%, rgba(59,130,246,0.10) 0%, transparent 65%),
               radial-gradient(ellipse 60% 40% at 90% 110%, rgba(99,102,241,0.06) 0%, transparent 60%),
               #020817`
            : `radial-gradient(ellipse 90% 55% at 50% -10%, rgba(99,63,200,0.10) 0%, transparent 65%),
               radial-gradient(ellipse 60% 40% at 10% 110%, rgba(59,130,246,0.05) 0%, transparent 60%),
               #020817`,
        }}
      />

      {/* ── Header ── */}
      <header className="sticky top-0 z-30 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-base shadow-lg shadow-blue-500/20">
              🌐
            </div>
            <span className="font-bold text-white text-base tracking-tight">IP2Data</span>
          </div>

          {/* Center — location pill (hidden on very small screens) */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-xs text-slate-400 min-w-0">
            <span className="truncate">{geo.city}, {geo.regionName}</span>
            <span className="text-slate-600">·</span>
            <span className="shrink-0 font-mono">{geo.countryCode}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onRefresh}
              disabled={refreshing}
              className="tap-target px-3 py-1.5 rounded-xl bg-white/6 hover:bg-white/10 active:bg-white/14 border border-white/8 text-slate-300 text-xs font-medium transition-colors disabled:opacity-40 flex items-center gap-1.5"
            >
              <RefreshCcw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-4 pt-6 pb-5 animate-fade-in">
        <div className="glass rounded-3xl p-5 sm:p-7 lg:p-8 relative overflow-hidden border border-white/6">
          {/* Blobs */}
          <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-blue-500/8 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-purple-500/8 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-5">
            {/* IP block */}
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-2">
                Your Public IP Address
              </p>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold gradient-text leading-none break-all">
                  {ip.ip}
                </span>
                <button
                  onClick={copyIP}
                  title="Copy IP"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/8 hover:bg-white/14 active:bg-white/20 border border-white/10 text-xs text-slate-300 transition-all shrink-0"
                >
                  {copied
                    ? <><Check className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400">Copied</span></>
                    : <><Copy className="w-3.5 h-3.5" /><span className="hidden sm:inline">Copy</span></>
                  }
                </button>
              </div>
              <p className="text-sm text-slate-400">
                {geo.city}, {geo.regionName}, {geo.country}
                <span className="mx-1.5 text-slate-700">·</span>
                <span className="text-slate-500 text-xs font-mono">{geo.timezone}</span>
              </p>
              <p className="text-xs text-slate-600 mt-1">{geo.isp}</p>
            </div>

            {/* Weather summary */}
            <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 shrink-0">
              <div className="text-5xl sm:text-6xl select-none" aria-hidden>
                {getWeatherEmoji(weather.current.weather_code, isDay)}
              </div>
              <div className="sm:text-right">
                <div className="text-3xl font-extrabold text-white leading-none">
                  {Math.round(weather.current.temperature_2m)}°C
                </div>
                <div className="text-sm text-slate-400 mt-0.5">
                  {getWeatherDescription(weather.current.weather_code)}
                </div>
                <div className="text-xs text-slate-500">
                  Feels {Math.round(weather.current.apparent_temperature)}°C
                </div>
              </div>
            </div>
          </div>

          {/* ── Quick stats — horizontal scroll on mobile, wrap on desktop ── */}
          <div className="mt-5 pt-4 border-t border-white/5">
            <div className="scroll-x sm:grid sm:grid-cols-4 lg:grid-cols-8 sm:gap-2">
              {quickStats.map(({ label, value, icon, accent }) => (
                <div
                  key={label}
                  className="stat-pill flex-shrink-0 w-[110px] sm:w-auto flex flex-col gap-0.5"
                >
                  <span className="text-lg leading-none">{icon}</span>
                  <span className={`text-sm font-semibold ${accent}`}>{value}</span>
                  <span className="text-xs text-slate-500">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Main card grid ── */}
      <main className="max-w-7xl mx-auto px-4 pb-16 space-y-4">
        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="animate-fade-up delay-100"><IPNetworkCard ip={ip} geo={geo} /></div>
          <div className="animate-fade-up delay-150"><LocationCard geo={geo} /></div>
          <div className="animate-fade-up delay-200"><WeatherCard weather={weather} /></div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="animate-fade-up delay-250"><ForecastCard weather={weather} /></div>
          <div className="animate-fade-up delay-300"><AirQualityCard airQuality={airQuality} /></div>
          <div className="animate-fade-up delay-350"><AstronomyCard weather={weather} /></div>
        </div>

        {/* Row 3 — Country spans full width on mobile, 1/3 on lg */}
        <div className="animate-fade-up delay-400">
          <CountryCard country={country} />
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-600">
            IP2Data &mdash; built with Next.js &amp; free public APIs
          </span>
          <div className="scroll-x justify-center sm:justify-end">
            {[
              { label: "ipify.org",       href: "https://www.ipify.org" },
              { label: "ip-api.com",      href: "https://ip-api.com" },
              { label: "open-meteo.com",  href: "https://open-meteo.com" },
              { label: "restcountries",   href: "https://restcountries.com" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-400 transition-colors whitespace-nowrap"
              >
                {label} <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
