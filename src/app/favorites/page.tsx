"use client"

import Link from "next/link"
import { Heart, GitCompareArrows, Search } from "lucide-react"
import { properties } from "@/data/properties"
import { useFavorites } from "@/context/favorites-context"
import { useCompare } from "@/context/compare-context"
import { PropertyCard } from "@/components/property/property-card"
import { EmptyState } from "@/components/shared/empty-state"
import { Button } from "@/components/ui/button"

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const { compareIds } = useCompare()

  const favoritedProperties = properties.filter((p) =>
    favorites.includes(p.id)
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-baseline gap-3 mb-6">
        <h1 className="text-2xl font-bold">お気に入り</h1>
        <span className="text-muted-foreground">
          {favorites.length}件の物件
        </span>
      </div>

      {/* Content */}
      {favoritedProperties.length === 0 ? (
        <EmptyState
          icon={<Heart />}
          title="まだお気に入りがありません"
          description="気になる物件のハートをクリックして保存しましょう"
          actionLabel="物件を探す"
          actionHref="/rooms"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoritedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      {/* Floating compare button */}
      {compareIds.length >= 2 && (
        <Button
          className="fixed bottom-6 right-6 z-40 rounded-full shadow-lg shadow-primary/20"
          render={<Link href="/compare" />}
        >
          <GitCompareArrows className="w-4 h-4 mr-2" />
          比較する ({compareIds.length}件)
        </Button>
      )}
    </div>
  )
}
