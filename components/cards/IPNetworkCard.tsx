"use client";

import { Shield, Wifi, Globe, Server } from "lucide-react";
import { GeoData, IPData } from "@/lib/types";

interface Props {
  ip: IPData;
  geo: GeoData;
}

export default function IPNetworkCard({ ip, geo }: Props) {
  const items = [
    { icon: Globe, label: "Public IP", value: ip.ip, mono: true, highlight: true },
    { icon: Wifi, label: "ISP", value: geo.isp },
    { icon: Server, label: "Organization", value: geo.org || geo.as },
    { icon: Shield, label: "AS Number", value: geo.as.split(" ")[0], mono: true },
  ];

  return (
    <div className="glass glass-hover rounded-2xl p-5 glow-blue">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
          <Globe className="w-4 h-4 text-blue-400" />
        </div>
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          IP & Network
        </h2>
      </div>

      <div className="space-y-3">
        {items.map(({ icon: Icon, label, value, mono, highlight }) => (
          <div key={label} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <Icon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="text-xs text-slate-400 shrink-0">{label}</span>
            </div>
            <span
              className={`text-sm truncate max-w-[60%] text-right ${
                mono ? "font-mono" : ""
              } ${highlight ? "text-blue-300 font-semibold text-base" : "text-slate-200"}`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
