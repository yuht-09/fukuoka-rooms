"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
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
      {/* Back link */}
      <Link
        href="/areas"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        &larr; エリアガイドに戻る
      </Link>

      {/* Hero */}
      <div className="mt-4">
        <AreaHero area={area} />
      </div>

      {/* Description */}
      <section className="mt-8">
        <h2 className="text-xl font-bold">エリアについて</h2>
        <p className="text-muted-foreground leading-relaxed mt-2">
          {area.description}
        </p>
      </section>

      {/* Highlights */}
      {area.highlights.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {area.highlights.map((highlight) => (
            <Badge key={highlight} variant="secondary">
              {highlight}
            </Badge>
          ))}
        </div>
      )}

      {/* Properties */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            このエリアの物件
            <span className="text-muted-foreground text-base font-normal ml-2">
              {areaProperties.length}件
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {areaProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-6">
          <Link
            href={`/rooms?area=${slug}`}
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            すべての物件を見る
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
