"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search, ArrowRight, Building2, MapPin, ChevronDown } from "lucide-react"
import { properties } from "@/data/properties"
import { areas } from "@/data/areas"
import { PropertyCard } from "@/components/property/property-card"
import { AreaCard } from "@/components/area/area-card"
import { sortProperties } from "@/lib/utils"

const rentOptions = [
  { label: "上限なし", value: "" },
  { label: "〜4万円", value: "40000" },
  { label: "〜5万円", value: "50000" },
  { label: "〜6万円", value: "60000" },
  { label: "〜7万円", value: "70000" },
  { label: "〜8万円", value: "80000" },
  { label: "〜10万円", value: "100000" },
  { label: "〜12万円", value: "120000" },
  { label: "〜15万円", value: "150000" },
]

export default function Home() {
  const router = useRouter()
  const [selectedArea, setSelectedArea] = useState("")
  const [selectedRent, setSelectedRent] = useState("")

  const recommendedProperties = sortProperties([...properties], "rent-asc").slice(0, 6)

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (selectedArea) params.set("area", selectedArea)
    if (selectedRent) params.set("rentMax", selectedRent)
    router.push(`/rooms${params.toString() ? `?${params.toString()}` : ""}`)
  }

  return (
    <div className="flex flex-col">
      {/* ===== Keyframe Animations ===== */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(12px, -18px) rotate(2deg); }
          50% { transform: translate(-8px, -30px) rotate(-1deg); }
          75% { transform: translate(6px, -12px) rotate(1.5deg); }
        }
        @keyframes float-drift {
          0%, 100% { transform: translate(0, 0) rotate(45deg); }
          33% { transform: translate(-20px, -15px) rotate(48deg); }
          66% { transform: translate(15px, -25px) rotate(42deg); }
        }
        @keyframes float-drift-2 {
          0%, 100% { transform: translate(0, 0) rotate(12deg); }
          33% { transform: translate(18px, 12px) rotate(16deg); }
          66% { transform: translate(-12px, 20px) rotate(8deg); }
        }
        @keyframes float-drift-3 {
          0%, 100% { transform: translate(0, 0) rotate(30deg); }
          50% { transform: translate(-10px, -20px) rotate(35deg); }
        }
        @keyframes orb-move-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, -40px) scale(1.15); }
        }
        @keyframes orb-move-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, 30px) scale(0.9); }
        }
        @keyframes shimmer-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          30% { transform: translate(3%, -15%); }
          50% { transform: translate(12%, 9%); }
          70% { transform: translate(9%, 4%); }
          90% { transform: translate(-1%, 7%); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
        .animate-float-drift { animation: float-drift 25s ease-in-out infinite; }
        .animate-float-drift-2 { animation: float-drift-2 22s ease-in-out infinite; }
        .animate-float-drift-3 { animation: float-drift-3 18s ease-in-out infinite; }
        .animate-orb-1 { animation: orb-move-1 30s ease-in-out infinite; }
        .animate-orb-2 { animation: orb-move-2 25s ease-in-out infinite; }
        .animate-shimmer {
          animation: shimmer-sweep 3s ease-in-out infinite;
        }
        .animate-grain {
          animation: grain 8s steps(10) infinite;
        }
        .animate-fade-up {
          animation: fade-up 0.8s ease-out both;
        }
        .animate-fade-up-delay-1 {
          animation: fade-up 0.8s ease-out 0.1s both;
        }
        .animate-fade-up-delay-2 {
          animation: fade-up 0.8s ease-out 0.2s both;
        }
        .animate-fade-up-delay-3 {
          animation: fade-up 0.8s ease-out 0.35s both;
        }
        .animate-fade-up-delay-4 {
          animation: fade-up 0.8s ease-out 0.5s both;
        }

        /* Custom scrollbar for recommended section */
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.25);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.4);
        }

        /* Select custom arrow */
        .select-styled {
          background-image: none;
        }
      `}</style>

      {/* ===== Hero Section ===== */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Multi-layer background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0d0d1a] to-[#0a1628]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-60" />

        {/* Animated noise/grain texture */}
        <div
          className="absolute inset-0 opacity-[0.035] animate-grain pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />

        {/* Decorative grid (subtle) */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Animated gradient orbs */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-primary/[0.06] blur-[120px] animate-orb-1" />
        <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full bg-[#2a1060]/30 blur-[100px] animate-orb-2" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-gold/[0.02] blur-[80px] animate-float-slow" />

        {/* Floating geometric elements - abstract architecture silhouettes */}
        <div className="absolute top-[12%] right-[8%] w-40 h-40 border border-primary/[0.06] rotate-45 rounded-lg animate-float-drift" />
        <div className="absolute top-[8%] right-[12%] w-24 h-64 border-l border-primary/[0.04] animate-float-slow" />
        <div className="absolute bottom-[18%] left-[6%] w-24 h-24 border border-primary/[0.04] rotate-12 rounded-lg animate-float-drift-2" />
        <div className="absolute top-[35%] right-[22%] w-20 h-20 border border-gold/[0.05] rotate-[30deg] rounded-sm animate-float-drift-3" />
        {/* Tall building silhouette lines */}
        <div className="absolute bottom-0 right-[15%] w-px h-[40%] bg-gradient-to-t from-primary/[0.06] to-transparent" />
        <div className="absolute bottom-0 right-[16%] w-px h-[55%] bg-gradient-to-t from-primary/[0.04] to-transparent" />
        <div className="absolute bottom-0 right-[20%] w-8 h-[35%] border-x border-primary/[0.03]" />
        <div className="absolute bottom-0 left-[12%] w-px h-[25%] bg-gradient-to-t from-gold/[0.04] to-transparent" />
        <div className="absolute bottom-0 left-[14%] w-12 h-[30%] border-x border-primary/[0.025]" />

        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full py-24">
          <div className="max-w-2xl">
            {/* Badge with shimmer */}
            <div className="animate-fade-up inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-primary/[0.06] mb-10 relative overflow-hidden">
              <MapPin className="w-3.5 h-3.5 text-primary relative z-10" />
              <span className="text-xs text-primary tracking-wide font-medium relative z-10">福岡に特化した賃貸検索</span>
              {/* Shimmer sweep */}
              <div className="absolute inset-0 animate-shimmer">
                <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-primary/[0.12] to-transparent skew-x-[-20deg]" />
              </div>
            </div>

            {/* Heading */}
            <h1 className="animate-fade-up-delay-1 text-5xl md:text-7xl font-bold font-[family-name:var(--font-inter)] leading-[1.1] tracking-tight">
              <span className="block">理想の暮らしを、</span>
              <span className="block mt-3 bg-gradient-to-r from-foreground via-foreground to-primary/60 bg-clip-text text-transparent">
                福岡で見つけよう。
              </span>
            </h1>

            {/* Subtext */}
            <p className="animate-fade-up-delay-2 text-muted-foreground text-base md:text-lg mt-8 max-w-lg leading-relaxed">
              SUUMO・homes.co.jpなど主要サイトの物件を一括検索。
              <br className="hidden sm:block" />
              あなたにぴったりの部屋が、きっと見つかります。
            </p>
          </div>

          {/* Search Bar - THE primary UI element */}
          <div className="animate-fade-up-delay-3 mt-14 max-w-2xl">
            <div className="relative flex flex-col sm:flex-row gap-2.5 bg-card/90 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-3 shadow-2xl shadow-black/40">
              {/* Subtle glow behind search bar */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/[0.08] via-transparent to-gold/[0.05] opacity-0 transition-opacity duration-500 pointer-events-none group-focus-within:opacity-100" style={{ filter: "blur(1px)" }} />

              {/* Area select */}
              <div className="relative flex-1 group/select">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="select-styled w-full h-14 pl-10 pr-10 rounded-xl bg-secondary/60 border border-white/[0.04] text-sm text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/30 focus:shadow-[inset_0_0_20px_rgba(99,102,241,0.06)] transition-all duration-300"
                >
                  <option value="">すべてのエリア</option>
                  {areas.map((area) => (
                    <option key={area.slug} value={area.slug}>
                      {area.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* Rent select */}
              <div className="relative flex-1 group/select">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
                <select
                  value={selectedRent}
                  onChange={(e) => setSelectedRent(e.target.value)}
                  className="select-styled w-full h-14 pl-10 pr-10 rounded-xl bg-secondary/60 border border-white/[0.04] text-sm text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/30 focus:shadow-[inset_0_0_20px_rgba(99,102,241,0.06)] transition-all duration-300"
                >
                  {rentOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* Search button */}
              <button
                type="button"
                onClick={handleSearch}
                className="h-14 px-10 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm flex items-center justify-center gap-2.5 transition-all duration-300 shrink-0 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Search className="w-4 h-4" />
                <span>検索する</span>
              </button>
            </div>

            {/* Stats row */}
            <div className="animate-fade-up-delay-4 flex items-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                <span className="font-[family-name:var(--font-inter)] font-semibold text-foreground tabular-nums">{properties.length}</span>
                <span>件の物件</span>
              </div>
              <div className="flex items-center gap-0.5">
                <div className="w-0.5 h-0.5 rounded-full bg-border" />
                <div className="w-4 h-px bg-border" />
                <div className="w-0.5 h-0.5 rounded-full bg-border" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
                <span className="font-[family-name:var(--font-inter)] font-semibold text-foreground tabular-nums">{areas.length}</span>
                <span>エリア対応</span>
              </div>
              <div className="flex items-center gap-0.5">
                <div className="w-0.5 h-0.5 rounded-full bg-border" />
                <div className="w-4 h-px bg-border" />
                <div className="w-0.5 h-0.5 rounded-full bg-border" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                <span className="text-muted-foreground">毎日更新</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
      </section>

      {/* ===== Section Divider ===== */}
      <div className="flex items-center justify-center py-2">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary/30 mx-3" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/20" />
      </div>

      {/* ===== おすすめ物件 Section ===== */}
      <section className="relative max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[11px] text-primary font-[family-name:var(--font-inter)] tracking-[0.2em] uppercase mb-2.5 font-medium">
              Recommended
            </p>
            <div className="flex items-center gap-4">
              <h2 className="text-2xl md:text-3xl font-bold">おすすめ物件</h2>
              <div className="hidden sm:block h-px w-12 bg-gradient-to-r from-primary/30 to-transparent mt-1" />
            </div>
          </div>
          <Link
            href="/rooms"
            className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 group"
          >
            すべての物件を見る
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Scroll container with edge fade masks */}
        <div className="relative">
          {/* Left fade mask */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none opacity-0" />
          {/* Right fade mask */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-5 overflow-x-auto pb-4 snap-x custom-scrollbar">
            {recommendedProperties.map((property, i) => (
              <div
                key={property.id}
                className="min-w-[280px] max-w-[300px] snap-start shrink-0"
                style={{
                  animationDelay: `${i * 80}ms`,
                }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/rooms"
          className="flex sm:hidden items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 mt-8"
        >
          すべての物件を見る
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* ===== Section Divider ===== */}
      <div className="flex items-center justify-center py-2">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/15" />
        <div className="w-1.5 h-1.5 rounded-full bg-gold/25 mx-3" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/15" />
      </div>

      {/* ===== エリアから探す Section ===== */}
      <section className="relative py-20 overflow-hidden">
        {/* Subtle background differentiation */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c0c14] to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(99,102,241,0.4) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 w-full">
          <div className="mb-10">
            <p className="text-[11px] text-gold font-[family-name:var(--font-inter)] tracking-[0.2em] uppercase mb-2.5 font-medium">
              Area Guide
            </p>
            <div className="flex items-center gap-4">
              <h2 className="text-2xl md:text-3xl font-bold">エリアから探す</h2>
              <div className="hidden sm:block h-px w-12 bg-gradient-to-r from-gold/30 to-transparent mt-1" />
            </div>
          </div>

          {/* Alternating large/small grid: first row 2 large, second row 4 small, remaining fills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* First 2: large cards spanning 2 cols */}
            {areas.slice(0, 2).map((area) => (
              <div key={area.slug} className="sm:col-span-1 lg:col-span-2">
                <AreaCard area={area} />
              </div>
            ))}
            {/* Next 4: normal size */}
            {areas.slice(2, 6).map((area) => (
              <div key={area.slug} className="sm:col-span-1 lg:col-span-1">
                <AreaCard area={area} />
              </div>
            ))}
            {/* Remaining: normal size */}
            {areas.slice(6).map((area) => (
              <div key={area.slug} className="sm:col-span-1 lg:col-span-1">
                <AreaCard area={area} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Bottom CTA / Footer transition ===== */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0e0e18] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <p className="text-[11px] text-primary font-[family-name:var(--font-inter)] tracking-[0.2em] uppercase mb-4 font-medium">
            Start Searching
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            福岡での新生活、始めませんか？
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8">
            {properties.length}件以上の物件から、あなたの条件にぴったりの部屋を探しましょう。
          </p>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            物件を探す
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
