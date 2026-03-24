"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search, ArrowRight, Building2, MapPin } from "lucide-react"
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
      {/* ===== Hero Section ===== */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-[#0d0d1a] to-[#0a1628]">
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Decorative geometric accent - top right */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-3xl" />

        {/* Decorative geometric accent - bottom left */}
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#1a1040]/40 blur-3xl" />

        {/* Floating diamond shapes */}
        <div className="absolute top-[15%] right-[10%] w-32 h-32 border border-primary/[0.07] rotate-45 rounded-lg" />
        <div className="absolute bottom-[20%] left-[8%] w-20 h-20 border border-primary/[0.05] rotate-12 rounded-lg" />
        <div className="absolute top-[40%] right-[25%] w-16 h-16 border border-gold/[0.06] rotate-[30deg] rounded-sm" />

        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full py-20">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/[0.06] mb-8">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-primary tracking-wide">福岡に特化した賃貸検索</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-inter)] leading-tight tracking-tight">
              <span className="block">理想の暮らしを、</span>
              <span className="block mt-2 bg-gradient-to-r from-foreground via-foreground to-primary/70 bg-clip-text text-transparent">
                福岡で見つけよう。
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-muted-foreground text-base md:text-lg mt-6 max-w-lg leading-relaxed">
              SUUMO・homes.co.jpなど主要サイトの物件を一括検索。
              <br className="hidden sm:block" />
              あなたにぴったりの部屋が、きっと見つかります。
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-12 max-w-2xl">
            <div className="flex flex-col sm:flex-row gap-2 bg-card/80 backdrop-blur-md border border-border rounded-2xl p-2 shadow-2xl shadow-black/30">
              {/* Area select */}
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full h-12 pl-9 pr-4 rounded-xl bg-secondary/60 border-0 text-sm text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">すべてのエリア</option>
                  {areas.map((area) => (
                    <option key={area.slug} value={area.slug}>
                      {area.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rent select */}
              <div className="relative flex-1">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <select
                  value={selectedRent}
                  onChange={(e) => setSelectedRent(e.target.value)}
                  className="w-full h-12 pl-9 pr-4 rounded-xl bg-secondary/60 border-0 text-sm text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {rentOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search button */}
              <button
                type="button"
                onClick={handleSearch}
                className="h-12 px-8 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>検索</span>
              </button>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-6 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="font-[family-name:var(--font-inter)] font-semibold text-foreground">{properties.length}</span>
                <span>件の物件</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-1.5">
                <span className="font-[family-name:var(--font-inter)] font-semibold text-foreground">{areas.length}</span>
                <span>エリア対応</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== おすすめ物件 Section ===== */}
      <section className="max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs text-primary font-[family-name:var(--font-inter)] tracking-widest uppercase mb-2">
              Recommended
            </p>
            <h2 className="text-2xl md:text-3xl font-bold">おすすめ物件</h2>
          </div>
          <Link
            href="/rooms"
            className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            すべての物件を見る
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          {recommendedProperties.map((property) => (
            <div key={property.id} className="min-w-[280px] max-w-[300px] snap-start shrink-0">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        <Link
          href="/rooms"
          className="flex sm:hidden items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mt-6"
        >
          すべての物件を見る
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* ===== エリアから探す Section ===== */}
      <section className="max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="mb-8">
          <p className="text-xs text-primary font-[family-name:var(--font-inter)] tracking-widest uppercase mb-2">
            Area Guide
          </p>
          <h2 className="text-2xl md:text-3xl font-bold">エリアから探す</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {areas.map((area) => (
            <AreaCard key={area.slug} area={area} />
          ))}
        </div>
      </section>
    </div>
  )
}
