// NavbarWithLinks.js
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useView } from "../ViewContext";
import { useLogin } from "../(context)/logincontext";
import {
  FaHome, FaCompass, FaPlusCircle, FaUser, FaSignOutAlt, FaSeedling,
  FaSearch, FaFilm, FaEnvelope, FaBell, FaRegNewspaper, FaCalculator,
  FaCloudSun, FaStar, FaChevronDown, FaShieldAlt
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

const NavItem = ({ href, icon: Icon, label, onClick }) => (
  <Link href={href} onClick={onClick}>
    <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-700 transition w-full text-left">
      <Icon className="text-lg" />
      <span className="text-base font-medium">{label}</span>
    </div>
  </Link>
);

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  const navItems = [
    { href: "/", icon: FaHome, label: "Home" },
    { href: "/news", icon: FaRegNewspaper, label: "News" },
    { href: "/govermentschemes", icon: FaStar, label: "Government Schemes" },
    { href: "/agrimarket", icon: FaRegNewspaper, label: "Market" },
    { href: "/weather", icon: FaCloudSun, label: "Weather" },
    { href: "/milkratecalculator", icon: FaCalculator, label: "Milk Rate Calculator" },
    { href: "/search", icon: FaSearch, label: "Search" },
    { href: "/reels", icon: FaFilm, label: "Reels" },
    { href: "/messages", icon: FaEnvelope, label: "Messages" },
    { href: "/notifications", icon: FaBell, label: "Notifications" },
    { href: "/explore", icon: FaCompass, label: "Explore" },
    { href: "/create", icon: FaPlusCircle, label: "Create Post" },
    { href: "/profile", icon: FaUser, label: "Profile" },
    { href: "/admin", icon: FaShieldAlt, label: "Admin" },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed  top-0 left-0 w-full bg-green-800 text-white flex items-center justify-between px-4 py-4 z-30 shadow">
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
        <ul className="flex flex-col gap-6 w-full overflow-y-auto max-h-[calc(100vh-6rem)] hide-scrollbar">
          {navItems.map(({ href, icon, label }) => (
            <li key={href}>
              <NavItem href={href} icon={icon} label={label} />
            </li>
          ))}
          <li className="mt-8">
            <NavItem href="/logout" icon={FaSignOutAlt} label="Logout" />
          </li>
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
              {navItems.map(({ href, icon, label }) => (
                <li key={href}>
                  <NavItem href={href} icon={icon} label={label} onClick={() => setNavOpen(false)} />
                </li>
              ))}
              <li className="mt-8">
                <NavItem href="/logout" icon={FaSignOutAlt} label="Logout" onClick={() => setNavOpen(false)} />
              </li>
            </ul>
          </nav>
        </>
      )}
    </>
  );
} 
