"use client";
import HomePage from "@/components/HomePage";
import { useView } from "@/Context/ViewContext";
import GovernmentSchemes from "@/components/GovermentSchemes";
import News from "@/components/News";
import AgriMarket from "@/components/Agrimarket";
import WeatherForecast from "@/components/Weather";
import MilkRateCalculator from "@/components/MilkRateCalculator";
import Reels from "@/components/Reels";
export default function Home() {
  const{view,setView} = useView();
  return (
    <div>
      {view === "home" && <HomePage /> }
      {view === "news" && <News /> }
      {view === "govermentschemes" && <GovernmentSchemes /> }
      {view === "agrimarket" && <AgriMarket />}
      {view === "weather" && <WeatherForecast />}
      {view === "milkratecalculator" && <MilkRateCalculator /> }
      {view === "search" && <HomePage />}
      {view === "reels" && <Reels />}
    </div>
  );
}
