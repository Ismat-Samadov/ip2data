"use client";

interface Props {
  stage: string;
}

const stages = [
  "Detecting your IP address...",
  "Fetching geolocation data...",
  "Loading weather & air quality...",
  "Gathering country information...",
  "Building your dashboard...",
];

export default function LoadingScreen({ stage }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Animated globe */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full border-2 border-blue-500/30 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-2 border-purple-500/40 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/40 to-purple-500/40 animate-pulse" />
          </div>
        </div>
        {/* Orbiting dot */}
        <div
          className="absolute top-0 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1.5"
          style={{ transformOrigin: "50% 54px" }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
        </div>
      </div>

      <h1 className="text-2xl font-bold gradient-text mb-2">IP2Data</h1>
      <p className="text-slate-400 text-sm mb-8">Your world, at a glance</p>

      {/* Stage list */}
      <div className="w-full max-w-xs space-y-2">
        {stages.map((s) => {
          const isActive = s === stage;
          const isPast = stages.indexOf(s) < stages.indexOf(stage);
          return (
            <div
              key={s}
              className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                isActive ? "text-white" : isPast ? "text-slate-500" : "text-slate-700"
              }`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  isActive
                    ? "bg-blue-400 animate-pulse"
                    : isPast
                    ? "bg-emerald-500"
                    : "bg-slate-700"
                }`}
              />
              {s}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs mt-6 h-0.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
          style={{
            width: `${((stages.indexOf(stage) + 1) / stages.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
