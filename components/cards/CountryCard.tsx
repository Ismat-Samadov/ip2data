"use client";

import Image from "next/image";
import { Flag, Users, BarChart3, Languages, DollarSign } from "lucide-react";
import { CountryData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface Props {
  country: CountryData;
}

export default function CountryCard({ country }: Props) {
  const currencies = Object.values(country.currencies ?? {});
  const languages = Object.values(country.languages ?? {});
  const currency = currencies[0];

  return (
    <div className="glass glass-hover rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center">
          <Flag className="w-4 h-4 text-rose-400" />
        </div>
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Country Info
        </h2>
      </div>

      {/* Flag + name hero */}
      <div className="flex items-center gap-3 mb-4">
        {country.flags?.png && (
          <div className="relative w-14 h-9 rounded-lg overflow-hidden shrink-0 border border-slate-700">
            <Image
              src={country.flags.png}
              alt={country.flags.alt ?? `Flag of ${country.name.common}`}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <div className="text-lg font-bold text-white">{country.name.common}</div>
          <div className="text-xs text-slate-400">{country.name.official}</div>
        </div>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-400">Population</span>
          </div>
          <span className="text-sm font-medium text-slate-200">{formatNumber(country.population)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-400">Area</span>
          </div>
          <span className="text-sm font-medium text-slate-200">{formatNumber(country.area)} km²</span>
        </div>

        {currency && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-xs text-slate-400">Currency</span>
            </div>
            <span className="text-sm font-medium text-slate-200">
              {currency.name} ({currency.symbol})
            </span>
          </div>
        )}

        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 shrink-0">
            <Languages className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-400">Languages</span>
          </div>
          <span className="text-xs text-slate-300 text-right">{languages.join(", ")}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flag className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-400">Region</span>
          </div>
          <span className="text-sm text-slate-300">{country.subregion || country.region}</span>
        </div>
      </div>
    </div>
  );
}
