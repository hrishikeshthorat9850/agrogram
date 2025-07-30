"use client";
import Image from "next/image";
import { useLogin } from "@/app/(context)/logincontext";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function UserSidebar() {
  const router = useRouter();
  const { user, loading } = useLogin();
  const [userInfo, setUserInfo] = useState(null);
  const [infoLoading, setInfoLoading] = useState(true);

useEffect(() => {
  console.log("🔍 Auth User ID:", user?.id);
  
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
      console.log("✅ Query Data is:", data);
      setUserInfo(data);
    }

    setInfoLoading(false);
  };

  fetchUserInfo();
}, [user?.id]);

  


  // 🌀 Show loading skeleton while fetching
  if (loading || infoLoading || !userInfo) {
    return (
      <aside className="hidden md:flex flex-col fixed top-16 right-6 w-80 gap-6 p-4 mt-0 z-50">        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <div className="w-[60px] h-[60px] rounded-full bg-gray-200 mb-2" />
          <div className="w-3/4 h-4 bg-gray-200 rounded mb-1" />
          <div className="w-1/2 h-3 bg-gray-200 rounded" />
        </div>
      </aside>
    );
  }

return (
  <aside className="hidden md:flex flex-col fixed top-0 right-0 w-70 gap-6 p-4 mt-0 z-50">
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
      <Image
        src="https://randomuser.me/api/portraits/men/1.jpg"
        alt={userInfo.firstName || "User"}
        width={60}
        height={60}
        className="rounded-full border mb-2"
      />
      <span className="font-bold text-green-800 text-lg">
        {`${userInfo.firstName} ${userInfo.lastName}`}
      </span>
      <span className="text-green-700 text-sm text-center mt-1">
        {user.email}
      </span>
    </div>

    <button
      onClick={async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error("❌ Logout failed:", error.message);
        } else {
          router.push("/");
        }
      }}
      className="px-4 py-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition duration-200"
    >
      Logout
    </button>

    <div className="text-xs text-gray-400 flex flex-wrap gap-x-3 gap-y-1">
      <a href="#" className="hover:underline">About</a>
      <a href="#" className="hover:underline">Help</a>
      <a href="#" className="hover:underline">API</a>
      <a href="#" className="hover:underline">Privacy</a>
      <a href="#" className="hover:underline">Terms</a>
      <a href="#" className="hover:underline">Locations</a>
      <a href="#" className="hover:underline">Language</a>
      <div className="w-full mt-2 text-gray-400 text-xs">
        © 2025 AgroInsta from HCT
      </div>
    </div>
  </aside>
);

}
