"use client";
import React, { useState } from "react";

export default function SidebarFilter() {
  const [communitiesOpen, setCommunitiesOpen] = useState(false); // closed by default
  const [priceOpen, setPriceOpen] = useState(false); // closed by default

  const communities = [
    "Al Jaddaf & Dhcc",
    "Jebel Ali",
    "Meydan - Riviera",
    "Dubai South - Azizi Venice",
    "Azizi Milan",
    "Dubai Islands",
    "Al Furjan",
    "Jumeirah Village Circle",
    "Palm Jumeirah",
    "Studio City",
    "Dubai Sports City",
  ];

  const priceRanges = ["Under 500k", "500k - 1m", "1m+", "2m+"];

  // whether any panel is open
  const anyOpen = communitiesOpen || priceOpen;

  return (
    <aside className="w-full max-w-[360px]">

      <h3 className="text-sm font-medium text-gray-600 mb-4">FILTER</h3>

      {/* HR → made bold */}
      <hr className={`border-[#000] border-[1px] ${anyOpen ? "mb-8" : "mb-6"}`} />

      {/* Communities */}
      <div className={communitiesOpen ? "mb-6" : "mb-8"}>
        <button
          onClick={() => setCommunitiesOpen((v) => !v)}
          aria-expanded={communitiesOpen}
          className="w-full flex items-center justify-between"
        >
          <span className="text-[20px] lg:text-[25px] font-black leading-[90%] tracking-[0.6px] uppercase text-[#555960]">
            COMMUNITIES
          </span>

          {/* DROPDOWN ICON — now SEMI-BOLD & BLACK */}
          <svg
            className={`w-6 h-6 transform transition-transform ${
              communitiesOpen ? "" : "rotate-180"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {communitiesOpen && (
          <div className="mt-4 space-y-3">
            {communities.map((c) => (
              <label key={c} className="flex items-center gap-3 text-gray-700">
                <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                <span className="text-sm">{c}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* HR → bold */}
      <hr className={`border-[#000] border-[1px] ${anyOpen ? "mb-6" : "mb-8"}`} />

      {/* Price Range */}
      <div className={priceOpen ? "" : "mb-0"}>
        <button
          onClick={() => setPriceOpen((v) => !v)}
          aria-expanded={priceOpen}
          className="w-full flex items-center justify-between"
        >
          <span className="text-[20px] lg:text-[25px] font-black leading-[90%] tracking-[0.6px] uppercase text-[#555960]">
            PRICE RANGE
          </span>

          {/* DROPDOWN ICON — semi bold + black */}
          <svg
            className={`w-6 h-6 transform transition-transform ${
              priceOpen ? "" : "rotate-180"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {priceOpen && (
          <div className="mt-4 space-y-3">
            {priceRanges.map((p) => (
              <label key={p} className="flex items-center gap-3 text-gray-700">
                <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                <span className="text-sm">{p}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
