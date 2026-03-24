"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowLeft, ChevronRight, MapPin, Sparkles } from "lucide-react"
import { areas } from "@/data/areas"
import { properties } from "@/data/properties"
import { AreaHero } from "@/components/area/area-hero"
import { PropertyCard } from "@/components/property/property-card"
import { Badge } from "@/components/ui/badge"

export default function AreaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const area = areas.find((a) => a.slug === slug)

  if (!area) {
    notFound()
  }

  const areaProperties = properties.filter((p) => p.areaSlug === slug)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back link - refined with animated arrow */}
      <Link
        href="/areas"
        className="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-400 transition-colors duration-200 mb-6"
      >
        <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
        <span>エリアガイドに戻る</span>
      </Link>

      {/* Hero */}
      <div className="mt-2">
        <AreaHero area={area} />
      </div>

      {/* Breadcrumb-like navigation indicator */}
      <div className="flex items-center gap-2 mt-6 text-xs text-gray-500">
        <Link href="/areas" className="hover:text-indigo-400 transition-colors">エリアガイド</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-indigo-400 font-medium">{area.name}</span>
      </div>

      {/* Description - pull-quote style */}
      <section className="mt-8 relative">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-violet-500/50 rounded-full" />
        <div className="pl-6">
          <h2 className="text-xs text-indigo-400 tracking-widest font-medium mb-3">ABOUT THIS AREA</h2>
          <p className="text-lg text-gray-300 leading-relaxed italic font-light">
            {area.description}
          </p>
        </div>
      </section>

      {/* Highlights - custom pill badges */}
      {area.highlights.length > 0 && (
        <div className="flex flex-wrap gap-2.5 mt-8">
          {area.highlights.map((highlight) => (
            <span
              key={highlight}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 hover:border-indigo-500/40 transition-colors duration-200"
            >
              <Sparkles className="w-3 h-3 text-indigo-400/70" />
              {highlight}
            </span>
          ))}
        </div>
      )}

      {/* Properties section */}
      <section className="mt-14">
        {/* PROPERTIES label pattern */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-400" />
            <p className="text-xs text-indigo-400 tracking-widest font-medium">PROPERTIES</p>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-[#1e1e2e] to-transparent" />
        </div>

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-100">
            このエリアの物件
            <span className="ml-3 text-sm font-normal text-gray-500">
              <span className="text-indigo-400 font-semibold">{areaProperties.length}</span>件
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {areaProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* CTA button */}
        <div className="mt-8 text-center">
          <Link
            href={`/rooms?area=${slug}`}
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium text-gray-100 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-300"
          >
            全ての物件を見る
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
