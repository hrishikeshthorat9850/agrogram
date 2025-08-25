"use client";
import Image from "next/image";
import { FaSearch, FaRegHeart, FaRegComment } from "react-icons/fa";
import { useEffect, useState } from "react";
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
import { supabase } from "./lib/supabaseClient";
// Sample data for posts, comments, user info, suggestions











export default function Home() {
  const [posts,setPosts] = useState([]);
  const [userInfo,setuserInfo] = useState({});
  useEffect(()=>{
    const getPosts = async()=>{
    const { data, error } = await supabase
      .from("posts")
      .select(`
        *,
        userinfo (
          id,
          "firstName",
          "lastName",
          profile_url
        ),
        post_comments (
          *
        ),
        post_likes(
          *
        )
      `);

      if(error){
        console.log("Error for getting data from Posts table is ",error)
      }else{
        console.log("Data for posts table is :",data)
        setPosts(data);
        data.map((data)=>(setuserInfo(data.userinfo)));
      }
    }
    getPosts();
  },[]);
    
  console.log("Posts in state Variable Posts" ,posts);
  console.log("UserInfo state variable :",userInfo);
  const { user } = useLogin();
  console.log("User is :",user);

  // Debug log
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
              <SearchBar />
              <PostCreation />
              <div className="w-full max-w-xl flex flex-col">
                {posts.map((post, idx) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    comment={post.post_comments}
                    idx={idx}
                  />
                ))}
              </div>
            {/* <AgriMarket /> */}
            {/* <GovernmentSchemes /> */}
            {/* <WeatherForecast /> */}
            {/* <News /> */}
            {/* <NewsFullPage newsId={selectedNewsId} /> */}
            {/* <MilkRateCalculator /> */}
            {/* <Reels /> */}
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
















