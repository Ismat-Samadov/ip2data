import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IP2Data — Your IP, Location & Weather Dashboard",
  description:
    "Instantly discover your IP address, location, weather, air quality, and more — all from a single dashboard.",
  keywords: ["IP address", "geolocation", "weather", "air quality", "dashboard"],
  openGraph: {
    title: "IP2Data Dashboard",
    description: "Your IP, location, weather & environment — one dashboard.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#020817] antialiased">{children}</body>
    </html>
  );
}
