"use client"

import Link from "next/link"
import { Heart, Building2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useFavorites } from "@/context/favorites-context"
import { Property } from "@/lib/types"
import { formatRent, formatArea, formatWalkMinutes } from "@/lib/utils"

type PropertyCardProps = {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const favorited = isFavorite(property.id)

  // Deterministic pattern seed from property id
  const seed = property.id.charCodeAt(0) + (property.id.charCodeAt(1) || 0)
  const hueA = (seed * 37) % 360
  const hueB = (hueA + 60) % 360

  return (
    <div className="group relative overflow-hidden rounded-lg bg-card transition-all duration-500 hover:-translate-y-1 [&:hover_.card-border]:opacity-100">
      {/* Gradient border effect on hover */}
      <div
        className="card-border pointer-events-none absolute -inset-px z-10 rounded-lg opacity-0 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, var(--primary), var(--gold), var(--primary))`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      {/* Static border */}
      <div className="pointer-events-none absolute -inset-px z-[5] rounded-lg border border-border group-hover:border-transparent transition-colors duration-500" />

      <Link href={`/rooms/${property.id}`} className="block">
        {/* Image area with geometric pattern */}
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          {/* Geometric pattern placeholder */}
          <div className="absolute inset-0">
            <svg
              viewBox="0 0 400 300"
              className="h-full w-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id={`grad-${property.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={`hsl(${hueA}, 30%, 15%)`} />
                  <stop offset="100%" stopColor={`hsl(${hueB}, 30%, 10%)`} />
                </linearGradient>
              </defs>
              <rect width="400" height="300" fill={`url(#grad-${property.id})`} />
              {/* Abstract architecture lines */}
              <line x1="50" y1="300" x2="50" y2="80" stroke={`hsl(${hueA}, 40%, 25%)`} strokeWidth="0.5" />
              <line x1="120" y1="300" x2="120" y2="40" stroke={`hsl(${hueA}, 40%, 25%)`} strokeWidth="0.5" />
              <line x1="122" y1="300" x2="122" y2="40" stroke={`hsl(${hueA}, 40%, 20%)`} strokeWidth="2" />
              <rect x="125" y="60" width="60" height="240" fill={`hsl(${hueA}, 30%, 13%)`} rx="1" />
              <rect x="200" y="100" width="80" height="200" fill={`hsl(${hueB}, 30%, 12%)`} rx="1" />
              <rect x="300" y="130" width="50" height="170" fill={`hsl(${hueA}, 25%, 14%)`} rx="1" />
              {/* Window dots */}
              {[140, 155, 170].map((x) =>
                [80, 100, 120, 140, 160, 180, 200, 220, 240, 260].map((y) => (
                  <rect
                    key={`${x}-${y}`}
                    x={x}
                    y={y}
                    width="5"
                    height="7"
                    rx="0.5"
                    fill={`hsl(${hueA}, 40%, ${18 + ((x + y) % 5)}%)`}
                  />
                ))
              )}
              {[215, 235, 255].map((x) =>
                [120, 140, 160, 180, 200, 220, 240, 260].map((y) => (
                  <rect
                    key={`${x}-${y}`}
                    x={x}
                    y={y}
                    width="6"
                    height="8"
                    rx="0.5"
                    fill={`hsl(${hueB}, 40%, ${17 + ((x + y) % 4)}%)`}
                  />
                ))
              )}
            </svg>
          </div>
          <div className="absolute inset-0 flex items-end justify-center pb-10 text-muted-foreground/40">
            <Building2 className="w-6 h-6" />
          </div>

          {/* Hover shimmer */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/90 via-transparent to-transparent" />

          {/* Station tag */}
          <div className="absolute top-3 left-3">
            <span className="inline-block rounded bg-black/50 px-2 py-0.5 text-[11px] font-medium text-white/70 backdrop-blur-sm">
              {property.nearestStation}
            </span>
          </div>

          {/* Hero rent on image */}
          <div className="absolute bottom-3 left-3">
            <span
              className="text-xl font-bold font-[family-name:var(--font-inter)] tabular-nums"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, var(--gold) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {formatRent(property.rent)}
            </span>
          </div>
        </div>

        {/* Content area */}
        <div className="p-4">
          {/* Rent + management fee */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-[family-name:var(--font-inter)] tabular-nums text-foreground">
              {formatRent(property.rent)}
            </span>
            <span className="text-xs text-muted-foreground">
              管理費 {formatRent(property.managementFee)}
            </span>
          </div>

          {/* Info chips */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
            <span className="inline-flex items-center rounded-md bg-secondary/80 px-2 py-0.5 text-xs text-muted-foreground ring-1 ring-inset ring-white/[0.04]">
              {property.layout}
            </span>
            <span className="inline-flex items-center rounded-md bg-secondary/80 px-2 py-0.5 text-xs text-muted-foreground ring-1 ring-inset ring-white/[0.04]">
              {formatArea(property.area)}
            </span>
            <span className="inline-flex items-center rounded-md bg-secondary/80 px-2 py-0.5 text-xs text-muted-foreground ring-1 ring-inset ring-white/[0.04]">
              {formatWalkMinutes(property.walkMinutes)}
            </span>
          </div>

          {/* Title */}
          <p className="text-sm text-muted-foreground/70 truncate mt-2">
            {property.title}
          </p>

          {/* Features */}
          {property.features.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {property.features.slice(0, 3).map((feature) => (
                <Badge
                  key={feature}
                  variant="secondary"
                  className="text-[11px] font-normal border border-white/[0.06] bg-transparent text-muted-foreground hover:bg-secondary"
                >
                  {feature}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Link>

      {/* Favorite button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          toggleFavorite(property.id)
        }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all duration-200 active:scale-90"
        aria-label={favorited ? "お気に入り解除" : "お気に入り追加"}
      >
        <Heart
          className={`w-4 h-4 transition-all duration-300 ${
            favorited
              ? "fill-gold text-gold scale-110"
              : "fill-transparent text-white/50 hover:text-white/80"
          }`}
          style={favorited ? { filter: "drop-shadow(0 0 4px var(--gold))" } : undefined}
        />
      </button>
    </div>
  )
}
