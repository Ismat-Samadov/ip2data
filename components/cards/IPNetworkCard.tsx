"use client";

import { useState } from "react";
import { Globe, Wifi, Server, Shield, Copy, Check } from "lucide-react";
import { GeoData, IPData } from "@/lib/types";

interface Props { ip: IPData; geo: GeoData; }

export default function IPNetworkCard({ ip, geo }: Props) {
  const [copied, setCopied] = useState(false);

  const copyIP = () => {
    navigator.clipboard.writeText(ip.ip).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const rows = [
    { icon: Wifi,   label: "ISP",          value: geo.isp },
    { icon: Server, label: "Organization", value: geo.org || geo.as },
    { icon: Shield, label: "AS Number",    value: geo.as.split(" ")[0], mono: true },
  ];

  return (
    <div className="glass card-hover card-accent-blue glow-blue rounded-2xl p-5 h-full">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="card-icon bg-blue-500/15">
          <Globe className="w-4 h-4 text-blue-400" />
        </div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          IP &amp; Network
        </span>
      </div>

      {/* IP hero */}
      <div className="mb-5 p-3.5 rounded-xl bg-blue-500/8 border border-blue-500/15">
        <p className="text-xs text-slate-500 mb-1">Public IP Address</p>
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-xl font-bold text-blue-300 break-all leading-tight">
            {ip.ip}
          </span>
          <button
            onClick={copyIP}
            className="shrink-0 p-2 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 active:bg-blue-500/35 border border-blue-500/20 text-blue-400 transition-colors tap-target"
          >
            {copied
              ? <Check className="w-3.5 h-3.5 text-emerald-400" />
              : <Copy className="w-3.5 h-3.5" />
            }
          </button>
        </div>
      </div>

      {/* Network rows */}
      <div className="space-y-3">
        {rows.map(({ icon: Icon, label, value, mono }) => (
          <div key={label} className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 shrink-0 pt-0.5">
              <Icon className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-xs text-slate-500">{label}</span>
            </div>
            <span className={`text-sm text-right text-slate-200 min-w-0 break-words ${mono ? "font-mono text-xs" : ""}`}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
