// NavbarWithLinks.js
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLogin } from "../Context/logincontext";
import { useView } from "@/Context/ViewContext";
import {
  FaHome, FaCompass, FaPlusCircle, FaUser, FaSignOutAlt, FaSeedling,
  FaSearch, FaFilm, FaEnvelope, FaBell, FaRegNewspaper, FaCalculator,
  FaCloudSun, FaStar
} from "react-icons/fa";

function AnimatedHamburger({ open, onClick }) {
  return (
    <button
      aria-label={open ? "Close menu" : "Open menu"}
      className="w-10 h-10 flex flex-col justify-center items-center group focus:outline-none"
      onClick={onClick}
    >
      <span className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${open ? "rotate-45 translate-y-2" : "mb-1.5"}`} />
      <span className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${open ? "opacity-0" : ""}`} />
      <span className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : "mt-1.5"}`} />
    </button>
  );
}

// Reusable NavItem
const NavItem = ({ icon: Icon, label, onClick, href }) => {
  const content = (
    <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-700 transition w-full cursor-pointer">
      <Icon className="text-lg" />
      <span className="text-base font-medium">{label}</span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block w-full">
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="w-full text-left">
      {content}
    </button>
  );
};

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user } = useLogin();
  const { setView } = useView();

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (navOpen && isMobile) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [navOpen, isMobile]);

  if (!mounted) return null;

  // Sidebar Navigation Items
  const navItems = [
    { label: "Home", icon: FaHome, view: "home" },
    { label: "News", icon: FaRegNewspaper, view: "news" },
    { label: "Government Schemes", icon: FaStar, view: "govermentschemes" },
    { label: "Market", icon: FaRegNewspaper, view: "agrimarket" },
    { label: "Weather", icon: FaCloudSun, view: "weather" },
    { label: "Milk Rate Calculator", icon: FaCalculator, view: "milkratecalculator" },
    { label: "Search", icon: FaSearch, view: "search" },
    { label: "Reels", icon: FaFilm, view: "reels" },
    { label: "Messages", icon: FaEnvelope, view: "messages" },
    { label: "Notifications", icon: FaBell, view: "notifications" },
    { label: "Explore", icon: FaCompass, view: "explore" },
    { label: "Create Post", icon: FaPlusCircle, view: "create" },
    { label: "Profile", icon: FaUser, view: "profile" },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-green-800 text-white flex items-center justify-between px-4 py-4 z-30 shadow">
        <div className="flex items-center gap-2">
          <FaSeedling className="text-2xl text-green-200" />
          <span className="text-xl font-bold tracking-tight">AgroGram</span>
        </div>
        <AnimatedHamburger open={navOpen} onClick={() => setNavOpen(o => !o)} />
      </div>

      {/* Sidebar for Desktop */}
      <nav className="hidden md:flex flex-col items-center bg-green-800 text-white w-64 py-8 px-4 min-h-screen fixed left-0 top-0 z-20 shadow-lg">
        <div className="flex items-center gap-2 mb-10">
          <FaSeedling className="text-3xl text-green-200" />
          <span className="text-2xl font-bold tracking-tight">AgroGram</span>
        </div>
        <ul className="flex flex-col gap-4 w-full overflow-y-auto max-h-[calc(100vh-6rem)] hide-scrollbar">
          {navItems.map(({ icon, label, view }) => (
            <li key={view}>
              <NavItem icon={icon} label={label} onClick={() => setView(view)} />
            </li>
          ))}
          {user && (
            <li className="mt-8">
              <NavItem href="/logout" icon={FaSignOutAlt} label="Logout" />
            </li>
          )}
        </ul>
      </nav>

      {/* Mobile Navbar Drawer */}
      {navOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={() => setNavOpen(false)} />
          <nav className="fixed top-0 left-0 w-64 h-full bg-green-800 text-white z-50 flex flex-col py-8 px-4 shadow-lg">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-2">
                <FaSeedling className="text-2xl text-green-200" />
                <span className="text-xl font-bold tracking-tight">AgroGram</span>
              </div>
            </div>
            <ul className="flex flex-col gap-6 w-full overflow-y-auto max-h-[calc(100vh-5rem)] hide-scrollbar">
              {navItems.map(({ view, icon, label }) => (
                <li key={view}>
                  <NavItem icon={icon} label={label} onClick={() => { setView(view); setNavOpen(false); }} />
                </li>
              ))}
              {user && (
                <li className="mt-8">
                  <NavItem href="/logout" icon={FaSignOutAlt} label="Logout" onClick={() => setNavOpen(false)} />
                </li>
              )}
            </ul>
          </nav>
        </>
      )}
    </>
  );
}
