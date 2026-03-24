"use client"

import Link from "next/link"
import { Heart, GitCompareArrows, Search, Sparkles } from "lucide-react"
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
      {/* Page header */}
      <div className="relative mb-10">
        {/* Decorative glow */}
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex items-start gap-4">
          {/* Heart icon with glow */}
          <div className="relative shrink-0 mt-1">
            <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-lg" />
            <div className="relative w-10 h-10 rounded-full bg-[#14141f] border border-pink-500/30 flex items-center justify-center">
              <Heart className="w-4.5 h-4.5 text-pink-400 fill-pink-400/30" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <p className="text-xs text-indigo-400 tracking-widest font-medium">FAVORITES</p>
            </div>
            <h1 className="text-2xl font-bold text-gray-100">お気に入り</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-[#14141f] border border-[#1e1e2e]">
                <span className="text-indigo-400 font-semibold">{favorites.length}</span>
                <span className="text-gray-500">件の物件</span>
              </span>
              {favorites.length > 0 && (
                <span className="text-xs text-gray-600">最近追加順</span>
              )}
            </div>
          </div>
        </div>

        {/* Decorative line */}
        <div className="mt-6 h-px bg-gradient-to-r from-pink-500/30 via-indigo-500/20 to-transparent" />
      </div>

      {/* Content */}
      {favoritedProperties.length === 0 ? (
        <div className="relative">
          {/* Illustration-like empty state decoration */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <div className="relative">
              <Heart className="w-64 h-64 text-pink-400" />
            </div>
          </div>
          <EmptyState
            icon={<Heart />}
            title="まだお気に入りがありません"
            description="気になる物件のハートをクリックして保存しましょう"
            actionLabel="物件を探す"
            actionHref="/rooms"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {favoritedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      {/* Floating compare button - premium gradient with glow */}
      {compareIds.length >= 2 && (
        <div className="fixed bottom-6 right-6 z-40">
          {/* Shadow glow */}
          <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-xl animate-pulse" />
          <Button
            className="relative rounded-full px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-2xl shadow-indigo-500/30 border-0 animate-[float_3s_ease-in-out_infinite]"
            render={<Link href="/compare" />}
          >
            <GitCompareArrows className="w-4 h-4 mr-2" />
            比較する ({compareIds.length}件)
          </Button>
        </div>
      )}
    </div>
  )
}
