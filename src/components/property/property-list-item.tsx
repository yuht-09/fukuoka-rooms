"use client"

import Link from "next/link"
import { Heart, Building2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useFavorites } from "@/context/favorites-context"
import { Property } from "@/lib/types"
import {
  formatRent,
  formatArea,
  formatBuildAge,
  formatWalkMinutes,
} from "@/lib/utils"

type PropertyListItemProps = {
  property: Property
}

export function PropertyListItem({ property }: PropertyListItemProps) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const favorited = isFavorite(property.id)

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-transparent hover:bg-[#181828]">
      {/* Left accent border on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary scale-y-0 transition-transform duration-300 origin-top group-hover:scale-y-100 z-10" />

      <Link href={`/rooms/${property.id}`} className="flex flex-col sm:flex-row">
        {/* Image area */}
        <div className="relative w-full sm:w-48 shrink-0 aspect-[16/9] sm:aspect-[4/3] bg-secondary overflow-hidden">
          <div className="absolute inset-0">
            <svg viewBox="0 0 200 150" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
              <rect width="200" height="150" fill="#12121c" />
              <rect x="30" y="30" width="30" height="120" fill="#181828" rx="1" />
              <rect x="80" y="50" width="40" height="100" fill="#161626" rx="1" />
              <rect x="140" y="60" width="25" height="90" fill="#1a1a2a" rx="1" />
            </svg>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          {/* Station overlay */}
          <div className="absolute bottom-2 left-2">
            <span className="text-[11px] text-white/60 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-sm">
              {property.nearestStation}
            </span>
          </div>
        </div>

        {/* Info area */}
        <div className="flex-1 p-4 min-w-0">
          {/* Rent - hero element */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-[family-name:var(--font-inter)] tabular-nums text-foreground">
              {formatRent(property.rent)}
            </span>
            <span className="text-xs text-muted-foreground/70">
              管理費 {formatRent(property.managementFee)}
            </span>
          </div>

          {/* Layout / area / walk / age as chips */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {[
              property.layout,
              formatArea(property.area),
              formatWalkMinutes(property.walkMinutes),
              formatBuildAge(property.yearBuilt),
            ].map((text) => (
              <span
                key={text}
                className="inline-flex items-center rounded-md bg-secondary/60 px-2 py-0.5 text-xs text-muted-foreground ring-1 ring-inset ring-white/[0.04]"
              >
                {text}
              </span>
            ))}
          </div>

          {/* Address */}
          <p className="text-sm text-muted-foreground/60 truncate mt-1.5">
            {property.address}
          </p>

          {/* Features */}
          {property.features.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {property.features.slice(0, 5).map((feature) => (
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
