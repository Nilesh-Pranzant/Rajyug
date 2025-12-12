"use client";
import React, { useEffect, useRef, useState } from "react";

type Property = {
  id: number;
  community: string;
  title: string;
  subtitle: string;
  price?: string;
  img: string;
};

/**
 * Curated architecture/building images (Unsplash) that visually resemble
 * Dubai/Azizi-style residential buildings.
 * Replace with your own local /public/images/*.jpg files if you prefer.
 */
const BUILDING_IMAGES = [
  "/project/Ameer-listing-thumb-920x735px.webp",
  "/project/Zain-listing-thumb-920x735px.webp",
  "/project/Neila-listing-thumb-920x735px.webp",
  "/project/Raffi-listing-thumb-920x735px.webp",
  "/project/Arian-listing-thumb-920x735px.webp",
  "/project/Listing_Thumbnail_920x735.webp",
  "/project/Ruby-listing-thumb-920x735px.webp",
  "/project/Thumbnail_856_x_1142px.webp",
  "/project/Azizi_Emerald_Listing_Thumbnail.webp",
  "/project/thumbnail-856x1142px.webp",
];


const sampleProperties: Property[] = Array.from({ length: 24 }).map((_, i) => {
  const titleOptions = [
    "AZIZI FARISHTA II",
    "AZIZI GABRIEL",
    "AZIZI LEILY",
    "AZIZI NOURA",
    "AZIZI WARES",
    "AZIZI TOWER 1",
    "AZIZI LINA",
    "AZIZI DAVID",
  ];
  const subtitleOptions = [
    "Studio, 1 Bedroom & Penthouses",
    "Studio, 1, 2 Bedrooms",
    "Commercial Spaces",
    "Studio, 1, 2 & 3 Bedrooms",
  ];
  return {
    id: i + 1,
    community: ["AL JADDAF & DHCC", "JEBEL ALI", "AL FURJAN", "AZIZI MILAN"][i % 4],
    title: titleOptions[i % titleOptions.length],
    subtitle: subtitleOptions[i % subtitleOptions.length],
    price: i % 3 === 0 ? `From AED ${520 + i * 8}K` : undefined,
    img: BUILDING_IMAGES[i % BUILDING_IMAGES.length],
  };
});

export default function PropertyGrid() {
  const [visibleCount, setVisibleCount] = useState<number>(9); // show 9 initially (3 columns)
  const [loadVisible, setLoadVisible] = useState<boolean>(false);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Listen to window scroll and reveal "Load More" when the grid bottom is near viewport bottom
    const onScroll = () => {
      const el = gridRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const buffer = 200; // px before bottom to show the button
      const show = rect.bottom - buffer <= window.innerHeight && visibleCount < sampleProperties.length;
      setLoadVisible(show);
    };

    // initial check
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [visibleCount]);

  const loadMore = () => {
    setVisibleCount((v) => Math.min(v + 9, sampleProperties.length));
    setLoadVisible(false);
    // small delay so new items render
    setTimeout(() => {
      // no internal scroll adjustments; page will naturally grow
    }, 60);
  };

  return (
    <div className="w-full" ref={gridRef}>
      {/* Grid — no internal scrollbar, part of page flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sampleProperties.slice(0, visibleCount).map((p) => (
          // FIXED TOTAL CARD HEIGHT: ensures all cards are identical in height
          <article
            key={p.id}
            className="bg-white rounded-sm overflow-hidden flex flex-col h-[560px] lg:h-[560px]"
          >
            {/* IMAGE: only image has hover effect */}
            <div className="h-2/3 bg-gray-200 relative overflow-hidden">
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover transform transition-transform duration-400 ease-out hover:scale-105"
                // image gets the scale on hover; card itself not transformed
              />
              <div className="absolute right-2 bottom-6 bg-[#e8dfd7] px-5 py-2 text-sm font-semibold text-[#222]">
                NEW RELEASE
              </div>
            </div>

            {/* CONTENT: fixed 1/3 height so consistent card size */}
            <div className="h-1/3 p-6 bg-[#e8e0da] flex flex-col justify-between">
              <div>
                <div className="text-xs text-[#666] mb-2">{p.community}</div>
                <div className="text-2xl font-extrabold text-[#424b54] mb-3">{p.title}</div>
              </div>

              <div className="flex items-start justify-between">
                <div className="text-sm text-[#555] flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M3 7h18" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 7v10a2 2 0 002 2h10" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>{p.subtitle}</div>
                </div>

                {p.price && (
                  <div className="text-sm text-[#333] border-l border-[#cfc6bd] pl-4 ml-4">
                    <div className="text-xs">From</div>
                    <div className="font-medium">{p.price}</div>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* bottom spacing so button doesn't overlap content */}
      <div className="h-10" />

      {/* LOAD MORE — visible when user scrolls near grid bottom */}
      <div className="mt-6 flex justify-center">
        {visibleCount < sampleProperties.length && (
          <button
            onClick={loadMore}
           className="self-center text-[#555960] bg-transparent hover:bg-black hover:text-white focus:ring-0 font-medium px-7 py-2.5 border-[1.5px] border-black hover:border-black text-sm text-center uppercase duration-200 ease-in-out transition-all w-[150px] inline-block"

          >
            LOAD MORE
          </button>
        )}
      </div>
    </div>
  );
}
