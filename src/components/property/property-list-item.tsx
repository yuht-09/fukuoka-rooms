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
    <div className="group relative rounded-xl overflow-hidden border border-border bg-card hover:border-primary/30 transition-all duration-300">
      <Link href={`/rooms/${property.id}`} className="flex">
        {/* Image area */}
        <div className="relative w-48 shrink-0 aspect-[4/3] bg-secondary">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-muted-foreground">
            <Building2 className="w-8 h-8" />
            <span className="text-xs">{property.nearestStation}</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Info area */}
        <div className="flex-1 p-4 min-w-0">
          {/* Rent */}
          <div className="flex items-baseline">
            <span className="text-2xl font-bold font-[family-name:var(--font-inter)] tabular-nums">
              {formatRent(property.rent)}
            </span>
            <span className="text-sm text-muted-foreground ml-1">
              管理費 {formatRent(property.managementFee)}
            </span>
          </div>

          {/* Layout / area / walk / age */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1.5">
            <span>{property.layout}</span>
            <span className="opacity-30">|</span>
            <span>{formatArea(property.area)}</span>
            <span className="opacity-30">|</span>
            <span>{formatWalkMinutes(property.walkMinutes)}</span>
            <span className="opacity-30">|</span>
            <span>{formatBuildAge(property.yearBuilt)}</span>
          </div>

          {/* Address */}
          <p className="text-sm text-muted-foreground truncate mt-1">
            {property.address}
          </p>

          {/* Features */}
          {property.features.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {property.features.slice(0, 5).map((feature) => (
                <Badge
                  key={feature}
                  variant="secondary"
                  className="text-xs"
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
        className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
        aria-label={favorited ? "お気に入り解除" : "お気に入り追加"}
      >
        <Heart
          className={`w-5 h-5 transition-colors ${
            favorited
              ? "fill-gold text-gold"
              : "fill-transparent text-white/60 hover:text-white"
          }`}
        />
      </button>
    </div>
  )
}
