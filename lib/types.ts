// IP & Geolocation
export interface IPData {
  ip: string;
}

export interface GeoData {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}

// Weather (Open-Meteo)
export interface WeatherData {
  latitude: number;
  longitude: number;
  timezone: string;
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    rain: number;
    weather_code: number;
    cloud_cover: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
    surface_pressure: number;
    visibility: number;
    uv_index: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    wind_speed_10m_max: number[];
    uv_index_max: number[];
    sunrise: string[];
    sunset: string[];
    daylight_duration: number[];
  };
}

// Air Quality (Open-Meteo)
export interface AirQualityData {
  current: {
    time: string;
    pm10: number;
    pm2_5: number;
    carbon_monoxide: number;
    nitrogen_dioxide: number;
    ozone: number;
    european_aqi: number;
    us_aqi: number;
  };
}

// Country (REST Countries)
export interface CountryData {
  name: { common: string; official: string };
  capital: string[];
  population: number;
  area: number;
  currencies: Record<string, { name: string; symbol: string }>;
  languages: Record<string, string>;
  flags: { png: string; svg: string; alt: string };
  timezones: string[];
  region: string;
  subregion: string;
}

// Combined dashboard data
export interface DashboardData {
  ip: IPData;
  geo: GeoData;
  weather: WeatherData;
  airQuality: AirQualityData;
  country: CountryData;
}
