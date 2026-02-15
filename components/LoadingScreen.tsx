"use client";

const stages = [
  "Detecting your IP address...",
  "Fetching geolocation data...",
  "Loading weather & air quality...",
  "Gathering country information...",
  "Building your dashboard...",
];

interface Props { stage: string; }

export default function LoadingScreen({ stage }: Props) {
  const activeIdx = stages.indexOf(stage);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Pulse rings */}
      <div className="relative flex items-center justify-center mb-10">
        <div className="absolute w-28 h-28 rounded-full border border-blue-500/15 animate-ping" style={{ animationDuration: "2s" }} />
        <div className="absolute w-20 h-20 rounded-full border border-purple-500/20 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.4s" }} />
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-white/10 flex items-center justify-center text-3xl shadow-lg shadow-blue-500/10">
          🌐
        </div>
      </div>

      {/* Brand */}
      <h1 className="text-3xl font-extrabold gradient-text mb-1 tracking-tight">IP2Data</h1>
      <p className="text-slate-500 text-sm mb-10">Gathering your world data&hellip;</p>

      {/* Stage steps */}
      <div className="w-full max-w-sm space-y-1 mb-8">
        {stages.map((s, i) => {
          const isActive = i === activeIdx;
          const isDone   = i < activeIdx;
          return (
            <div
              key={s}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-blue-500/10 border border-blue-500/20"
                  : isDone
                  ? "opacity-50"
                  : "opacity-20"
              }`}
            >
              {/* Step indicator */}
              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                isActive
                  ? "bg-blue-500 text-white shadow shadow-blue-500/40"
                  : isDone
                  ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                  : "bg-slate-800 text-slate-600 border border-slate-700"
              }`}>
                {isDone ? "✓" : i + 1}
              </div>
              <span className={`text-sm ${isActive ? "text-white font-medium" : isDone ? "text-slate-500" : "text-slate-700"}`}>
                {s}
              </span>
              {isActive && (
                <div className="ml-auto flex gap-1">
                  {[0, 1, 2].map(d => (
                    <div
                      key={d}
                      className="w-1 h-1 rounded-full bg-blue-400 animate-bounce"
                      style={{ animationDelay: `${d * 0.15}s` }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-sm">
        <div className="flex justify-between text-xs text-slate-600 mb-1.5">
          <span>Loading data</span>
          <span>{Math.round(((activeIdx + 1) / stages.length) * 100)}%</span>
        </div>
        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${((activeIdx + 1) / stages.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
