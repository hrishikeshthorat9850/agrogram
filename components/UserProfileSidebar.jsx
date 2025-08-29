"use client";
import Image from "next/image";
import { useLogin } from "@/Context/logincontext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function UserSidebar() {
  const router = useRouter();
  const { user, loading } = useLogin();
  const [userInfo, setUserInfo] = useState(null);
  const [infoLoading, setInfoLoading] = useState(true);

  useEffect(() => { 
    const fetchUserInfo = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from("userinfo")
        .select("*") // ✅ CORRECT
        .eq("id", user.id)
        .maybeSingle()
      if (error) {
        console.error("❌ Supabase error:", error);
      } else if (!data) {
        console.warn("⚠️ No user info found.");
      } else {
        setUserInfo(data);
      }

      setInfoLoading(false);
    };

    fetchUserInfo();
  }, [user?.id]);
    if (loading || infoLoading || !userInfo) {
      return (
        <aside className="hidden md:flex flex-col fixed top-16 right-4 w-56 
          bg-white/90 backdrop-blur-md border border-gray-200 dark:bg-gray-900/90 dark:border-gray-700
          shadow-lg rounded-2xl z-50 p-4 animate-slideIn">

          {/* Profile Card Skeleton */}
          <div className="flex flex-col items-center text-center animate-pulse">
            <div className="w-[55px] h-[55px] rounded-full bg-gray-300 dark:bg-gray-700 mb-2" />
            <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded mb-1" />
            <div className="w-20 h-3 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>

          {/* Logout Button Skeleton */}
          <div className="mt-4 w-full h-8 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />

          {/* Footer Links Skeleton */}
          <div className="mt-auto grid grid-cols-2 gap-1 text-[11px] animate-pulse">
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="col-span-2 h-3 mt-2 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        </aside>
      );
    }



  return (
    <aside className="hidden md:flex flex-col fixed top-16 right-4 w-56 
      bg-white/90 backdrop-blur-md border border-gray-200 dark:bg-gray-900/90 dark:border-gray-700
      shadow-lg rounded-2xl z-50 p-4 animate-slideIn">
      
      {/* Profile Card */}
      <div className="flex flex-col items-center text-center">
        <Image
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt={userInfo.firstName || 'User'}
          width={55}
          height={55}
          className="rounded-full border-2 border-green-200 shadow-sm mb-2"
        />
        <span className="font-semibold text-base text-green-800 dark:text-green-300">
          {`${userInfo.firstName} ${userInfo.lastName}`}
        </span>
        <span className="text-xs text-gray-600 dark:text-gray-400">
          {user.email}
        </span>
      </div>

      {/* Logout Button */}
      <button
        onClick={async () => {
          const { error } = await supabase.auth.signOut();
          if (error) {
            console.error("❌ Logout failed:", error.message);
          } else {
            router.push("/");
          }
        }}
        className="mt-4 flex items-center justify-center gap-2 px-3 py-2 w-full 
          bg-red-500 text-white rounded-lg shadow hover:bg-red-600 active:scale-95 
          transition duration-200 text-sm"
      >
        Logout
      </button>

      {/* Footer Links */}
      <div className="mt-auto text-[11px] text-gray-500 dark:text-gray-400 grid grid-cols-2 gap-1">
        <a href="#" className="hover:underline">About</a>
        <a href="#" className="hover:underline">Help</a>
        <a href="#" className="hover:underline">API</a>
        <a href="#" className="hover:underline">Privacy</a>
        <a href="#" className="hover:underline">Terms</a>
        <a href="#" className="hover:underline">Locations</a>
        <a href="#" className="hover:underline">Language</a>
        <div className="col-span-2 mt-2 text-center text-gray-400 text-[10px]">
          © 2025 AgroInsta
        </div>
      </div>
    </aside>
  );
}
