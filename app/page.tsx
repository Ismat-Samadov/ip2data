"use client";

import { useCallback, useEffect, useState } from "react";
import { DashboardData } from "@/lib/types";
import Dashboard from "@/components/Dashboard";
import LoadingScreen from "@/components/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen";

const LOAD_STAGES = [
  "Detecting your IP address...",
  "Fetching geolocation data...",
  "Loading weather & air quality...",
  "Gathering country information...",
  "Building your dashboard...",
];

export default function HomePage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stage, setStage] = useState(LOAD_STAGES[0]);

  const fetchData = useCallback(async () => {
    setError(null);

    // Simulate stage progress for UX
    let stageIdx = 0;
    const stageTimer = setInterval(() => {
      stageIdx = Math.min(stageIdx + 1, LOAD_STAGES.length - 1);
      setStage(LOAD_STAGES[stageIdx]);
    }, 600);

    try {
      const res = await fetch("/api/all");
      clearInterval(stageTimer);
      setStage(LOAD_STAGES[LOAD_STAGES.length - 1]);

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to fetch data");
      }

      const json = await res.json();
      setData(json);
    } catch (e) {
      clearInterval(stageTimer);
      setError(e instanceof Error ? e.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    setStage(LOAD_STAGES[0]);
    setLoading(true);
    fetchData();
  }, [fetchData]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setStage(LOAD_STAGES[0]);
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <LoadingScreen stage={stage} />;
  }

  if (error || !data) {
    return (
      <ErrorScreen
        message={error ?? undefined}
        onRetry={() => {
          setLoading(true);
          setStage(LOAD_STAGES[0]);
          fetchData();
        }}
      />
    );
  }

  return <Dashboard data={data} onRefresh={handleRefresh} refreshing={refreshing} />;
}
