import React from "react";
import { FaCloudSun, FaTint, FaWind, FaLightbulb, FaSun, FaCloudRain, FaCloud, FaRegSun } from "react-icons/fa";

const weather = {
  temp: "32°C",
  condition: "Partly Cloudy",
  rain: "60% chance",
  wind: "8 km/h",
  humidity: "72%",
  sunrise: "5:45 AM",
  sunset: "6:55 PM",
  tip: {
    text: "Chance of rain tomorrow afternoon. Avoid pesticide spray today.",
    type: "warning", // could be 'info', 'warning', 'good'
  },
};

const forecast = [
  {
    day: "Tomorrow",
    icon: <FaCloudRain className="text-blue-400 text-2xl" />,
    temp: "28°C",
    rain: "80%",
    tip: "Heavy rain expected. Cover stored grains."
  },
  {
    day: "Wed",
    icon: <FaSun className="text-yellow-400 text-2xl" />,
    temp: "34°C",
    rain: "10%",
    tip: "Good day for sowing seeds."
  },
  {
    day: "Thu",
    icon: <FaCloud className="text-gray-400 text-2xl" />,
    temp: "30°C",
    rain: "30%",
    tip: "Mild rain possible. Monitor soil moisture."
  },
];

export default function WeatherForecast() {
  return (
    <section className="w-full max-w-md mx-auto mt-8 px-4">
      {/* Main Weather Card */}
      <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-xl shadow border border-green-100 p-6 mb-6 flex flex-col gap-3">
        <div className="flex items-center gap-4 mb-2">
          <FaCloudSun className="text-5xl text-yellow-400" />
          <div>
            <div className="text-4xl font-bold text-green-900 flex items-center gap-2">
              <span role="img" aria-label="weather">🌤️</span> {weather.temp}
            </div>
            <div className="text-green-700 text-lg font-semibold">{weather.condition}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 mt-2 text-green-800 text-base">
          <div className="flex items-center gap-2"><FaTint className="text-blue-400" /> Rain: {weather.rain}</div>
          <div className="flex items-center gap-2"><FaWind className="text-blue-600" /> Wind: {weather.wind}</div>
          <div className="flex items-center gap-2"><FaRegSun className="text-yellow-500" /> Humidity: {weather.humidity}</div>
        </div>
        <div className="flex gap-6 mt-2 text-green-800 text-base">
          <div className="flex items-center gap-2"><FaSun className="text-yellow-400" /> Sunrise: {weather.sunrise}</div>
          <div className="flex items-center gap-2"><FaSun className="text-orange-500" /> Sunset: {weather.sunset}</div>
        </div>
        <div className={`flex items-center gap-2 mt-3 px-3 py-2 rounded font-medium ${weather.tip.type === 'warning' ? 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900' : weather.tip.type === 'good' ? 'bg-green-100 border-l-4 border-green-500 text-green-900' : 'bg-blue-50 border-l-4 border-blue-400 text-blue-900'}`}>
          <FaLightbulb className={weather.tip.type === 'warning' ? 'text-yellow-400' : weather.tip.type === 'good' ? 'text-green-500' : 'text-blue-400'} />
          <span>{weather.tip.text}</span>
        </div>
      </div>
      {/* 3-Day Forecast */}
      <div className="bg-white rounded-xl shadow border border-green-100 p-4 flex flex-col gap-2">
        <div className="text-green-800 font-semibold mb-2">Next 3 Days</div>
        <div className="flex gap-3 justify-between">
          {forecast.map((f, i) => (
            <div key={i} className="flex flex-col items-center bg-green-50 rounded-lg p-3 shadow w-1/3">
              <div className="font-semibold text-green-700 mb-1">{f.day}</div>
              {f.icon}
              <div className="text-green-900 font-bold mt-1">{f.temp}</div>
              <div className="text-blue-600 text-sm">Rain: {f.rain}</div>
              <div className="text-xs text-green-700 mt-1 text-center">{f.tip}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 