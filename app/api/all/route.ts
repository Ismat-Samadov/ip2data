import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Step 1: Detect IP — prefer X-Forwarded-For, fallback to ipify
    let ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
              req.headers.get("x-real-ip") ||
              "8.8.8.8";

    // For local dev, use a real public IP for demo
    if (ip === "::1" || ip === "127.0.0.1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
      const ipRes = await fetch("https://api.ipify.org?format=json", { cache: "no-store" });
      const ipJson = await ipRes.json();
      ip = ipJson.ip;
    }

    // Step 2: Geolocation from ip-api.com (free, no key)
    const geoRes = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`,
      { next: { revalidate: 300 } }
    );
    const geo = await geoRes.json();

    if (geo.status !== "success") {
      return NextResponse.json({ error: "Geolocation failed", details: geo.message }, { status: 500 });
    }

    // Step 3: Fetch weather, air quality, and country info in parallel
    const [weatherRes, airRes, countryRes] = await Promise.all([
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${geo.lat}&longitude=${geo.lon}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m,surface_pressure,visibility,uv_index` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,uv_index_max,sunrise,sunset,daylight_duration` +
        `&timezone=${encodeURIComponent(geo.timezone)}&forecast_days=7`,
        { next: { revalidate: 300 } }
      ),
      fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${geo.lat}&longitude=${geo.lon}` +
        `&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone,european_aqi,us_aqi`,
        { next: { revalidate: 300 } }
      ),
      fetch(
        `https://restcountries.com/v3.1/alpha/${geo.countryCode}?fields=name,capital,population,area,currencies,languages,flags,timezones,region,subregion`,
        { next: { revalidate: 86400 } }
      ),
    ]);

    const [weather, airQuality, countryArr] = await Promise.all([
      weatherRes.json(),
      airRes.json(),
      countryRes.json(),
    ]);

    const country = Array.isArray(countryArr) ? countryArr[0] : countryArr;

    return NextResponse.json({
      ip: { ip },
      geo,
      weather,
      airQuality,
      country,
    });
  } catch (err) {
    console.error("[/api/all]", err);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
