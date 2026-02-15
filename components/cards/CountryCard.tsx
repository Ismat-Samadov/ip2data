"use client";

import Image from "next/image";
import { Flag, Users, BarChart3, Languages, DollarSign, Globe2 } from "lucide-react";
import { CountryData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface Props { country: CountryData; }

export default function CountryCard({ country }: Props) {
  const currencies = Object.values(country.currencies ?? {});
  const languages  = Object.values(country.languages ?? {});
  const currency   = currencies[0];

  const stats = [
    { icon: Users,    label: "Population", value: formatNumber(country.population) },
    { icon: BarChart3,label: "Area",       value: `${formatNumber(country.area)} km²` },
    { icon: Globe2,   label: "Region",     value: country.subregion || country.region },
    ...(currency ? [{ icon: DollarSign, label: "Currency", value: `${currency.name} (${currency.symbol})` }] : []),
    { icon: Languages,label: "Languages",  value: languages.slice(0, 3).join(", ") },
  ];

  return (
    <div className="glass card-hover card-accent-rose glow-rose rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="card-icon bg-rose-500/15">
          <Flag className="w-4 h-4 text-rose-400" />
        </div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Country Info
        </span>
      </div>

      {/* Flag + country name hero */}
      <div className="flex items-center gap-4 mb-5 p-3.5 rounded-xl bg-rose-500/6 border border-rose-500/12">
        {country.flags?.png && (
          <div className="relative w-16 h-11 rounded-lg overflow-hidden shrink-0 border border-white/10 shadow-md">
            <Image
              src={country.flags.png}
              alt={country.flags.alt ?? `Flag of ${country.name.common}`}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        )}
        <div className="min-w-0">
          <div className="text-xl font-bold text-white leading-tight">{country.name.common}</div>
          <div className="text-xs text-slate-500 mt-0.5 truncate">{country.name.official}</div>
        </div>
      </div>

      {/* Stats — responsive grid on mobile, rows on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-2.5">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-2.5">
            <div className="mt-0.5 shrink-0">
              <Icon className="w-3.5 h-3.5 text-slate-600" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-slate-500">{label}</div>
              <div className="text-sm text-slate-200 leading-snug break-words">{value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
