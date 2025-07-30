"use client";
import Image from "next/image";
import { FaSearch, FaRegHeart, FaRegComment } from "react-icons/fa";
import { useState } from "react";
import SearchBar from "./(components)/search/page";
import PostCreation from "./(components)/postcreation/page";
import PostCard from "./(components)/post/page";
import UserSidebar from "./(components)/usersidebar/page";
import AgriMarket from "./(components)/agrimarket/page";
import Navbar from "./(components)/Navbar";
import Link from "next/link";
import WeatherForecast from "./(components)/weather/page";
import { useView } from "./ViewContext";
import News from "./(components)/news/page";
import NewsFullPage from "./(components)/newsfullpage/page";
import GovernmentSchemes from "./(components)/govermentschemes/page";
import MilkRateCalculator from "./(components)/milkratecalculator/page";
import Reels from "./(components)/reels/page";
import { ThemeProvider, useTheme } from "./(context)/themecontext";
import { useLogin } from "./(context)/logincontext";

//My Changes
import Login from "./(components)/(authentication)/login/page";
import ThemeToggler from "./(components)/(utils)/ThemeToggler";
import UserBox from "./User/UserBox";
// Sample data for posts, comments, user info, suggestions
const userNames = [
  "Farmer John", "Farmer Priya", "Farmer Chen", "Farmer Maria", "Farmer Ahmed", "Farmer Elena", "Farmer Luis", "Farmer Grace", "Farmer Ivan", "Farmer Amina"
];
const captions = [
  "Harvested fresh corn today! 🌽 #farmerslife",
  "Our cows are loving the green fields this season! 🐄💚",
  "Planted new rice paddies today. Excited for the yield! 🌾",
  "Sunset over the fields is always magical. 🌅",
  "Just finished sowing wheat seeds. Fingers crossed! 🌱",
  "The tractor broke down, but we fixed it together! 🚜",
  "Rainy days make for happy crops. ☔🌾",
  "Early morning harvest with the team. Grateful! 🙏",
  "Trying out organic fertilizers this season. 🌿",
  "Farm dog keeping watch as always. 🐕"
];
const unsplashImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1468421870903-4df1664ac249?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80"
];

const samplePosts = Array.from({ length: 100 }, (_, i) => {
  const userIdx = i % userNames.length;
  const captionIdx = i % captions.length;
  const imageIdx = i % unsplashImages.length;
  const gender = userIdx % 2 === 0 ? "men" : "women";
  const avatarNum = (i % 99) + 1;
  return {
    id: i + 1,
    user: userNames[userIdx],
    avatar: `https://randomuser.me/api/portraits/${gender}/${avatarNum}.jpg`,
    image: unsplashImages[imageIdx],
    text: captions[captionIdx],
  };
});

const sampleComments = [
  { user: "Farmer Alex", text: "Great harvest! 🌾" },
  { user: "Farmer Priya", text: "Looks amazing!" },
  { user: "Farmer Chen", text: "Keep it up!" },
  { user: "Farmer Maria", text: "Beautiful field!" },
  { user: "Farmer Ahmed", text: "Inspiring work!" },
  { user: "Farmer Elena", text: "Love this!" },
  { user: "Farmer Luis", text: "So green!" },
  { user: "Farmer Grace", text: "Congrats!" },
  { user: "Farmer Ivan", text: "Nice job!" },
  { user: "Farmer Amina", text: "Wonderful!" },
];

const userInfo = {
  name: "Farmer John",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  bio: "Corn & wheat farmer | Nature lover 🌱",
};

const onLogout = () => {
  console.log("User Logs Out");
};

const suggestions = [
  { name: "Farmer Priya", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Farmer Chen", avatar: "https://randomuser.me/api/portraits/men/65.jpg" },
  { name: "Farmer Maria", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Farmer Ahmed", avatar: "https://randomuser.me/api/portraits/men/12.jpg" },
];

export default function Home() {
  const { view, selectedNewsId } = useView();
  const { theme, toggleTheme } = useTheme();
  const { user } = useLogin();
  console.log(user);

  // Debug log
  console.log('Home render: view =', view, 'selectedNewsId =', selectedNewsId);
  return (
    <div className="min-h-screen bg-green-50 flex font-sans overflow-x-hidden">
      {/* Navbar is now in layout, pass setView to handle nav clicks */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64 w-full pt-12 md:pt-0">
        {/* Main Content: 2-column layout on desktop, stacked on mobile */}
        <main className="flex flex-col md:flex-row w-full  max-w-6xl mx-auto gap-6 mr-12">
          {/* Center Column */}
          <div className="flex flex flex-col items-center ml-0 w-full">
            {/* Centered Line Above Search */}
            <div className="w-full mt-10 max-w-xl bg-green-700 text-white py-3 rounded-md shadow-md flex flex-col items-center mb-4">
              <p className="text-lg text-center">
                Connect, share, and grow with fellow farmers 🌱
              </p>
            </div>
            {/* Auth Buttons */}
            {!user ?
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 mb-4 w-full mt-5">
              <Link href="/login" className="w-full md:w-auto bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold hover:bg-green-200 transition-colors text-center">
                Log in
              </Link>
              <Link href="/signup" className="w-full md:w-auto bg-green-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-800 transition-colors text-center">
                Sign up
              </Link>
            </div>
            : null}
            {view === "posts" && <>
              <SearchBar />
              <PostCreation />
              <div className="w-full max-w-xl flex flex-col">
                {samplePosts.map((post, idx) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    comment={sampleComments[idx % sampleComments.length]}
                    idx={idx}
                  />
                ))}
              </div>
            </>}
            {view === "market" && <AgriMarket />}
            {view === "schemes" && <GovernmentSchemes />}
            {view === "weather" && <WeatherForecast />}
            {view === "news" && <News />}
            {view === "news-full" && <NewsFullPage newsId={selectedNewsId} />}
            {view === "milk-rate" && <MilkRateCalculator />}
            {view === "reels" && <Reels />}
          </div>
          {user ?
          <UserSidebar /> : <Login/>
          }
        </main>

        {/* Footer */}
        <footer className="mt-8 mb-4 text-gray-500 text-sm text-center">
          © {new Date().getFullYear()} AgroGram. Built for farmers with ❤️
        </footer>
      </div>
    </div>
  );
}
