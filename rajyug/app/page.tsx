import React from "react";
import SidebarFilter from "@/src/components/SidebarFilter";
import ProjectsHero from "@/src/components/ProjectsHero";
import PropertyGrid from "@/src/components/PropertyGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto p-6">

        {/* HERO (full width) */}
        <div>
          <ProjectsHero />
        </div>

        {/* three-column layout below hero:
            - left: sidebar (fixed width)
            - right: property list (page scroll handles movement)
        */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* left sidebar */}
          <div className="lg:col-span-3 flex justify-start items-start">
            <div className="w-full">
              <SidebarFilter />
            </div>
          </div>

          {/* center/right area: property grid (part of page flow — no internal scroll) */}
          <div className="lg:col-span-9">
            <PropertyGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
