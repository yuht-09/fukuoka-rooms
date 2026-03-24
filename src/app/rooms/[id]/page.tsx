"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Heart,
  GitCompareArrows,
  ArrowLeft,
  Building2,
  MapPin,
  Train,
  Calendar,
  Ruler,
  Layers,
  Home,
} from "lucide-react"
import { properties } from "@/data/properties"
import { PropertyCard } from "@/components/property/property-card"
import {
  formatRent,
  formatArea,
  formatBuildAge,
  formatWalkMinutes,
} from "@/lib/utils"
import { useFavorites } from "@/context/favorites-context"
import { useCompare } from "@/context/compare-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const property = properties.find((p) => p.id === id)

  if (!property) {
    notFound()
  }

  const { toggleFavorite, isFavorite } = useFavorites()
  const { addToCompare, removeFromCompare, isInCompare } = useCompare()

  const favorited = isFavorite(property.id)
  const comparing = isInCompare(property.id)

  // Related properties: same area, exclude current, take 3
  const relatedProperties = properties
    .filter((p) => p.areaSlug === property.areaSlug && p.id !== property.id)
    .slice(0, 3)

  const detailItems = [
    { label: "間取り", value: property.layout, icon: Home },
    { label: "専有面積", value: formatArea(property.area), icon: Ruler },
    {
      label: "階数",
      value: `${property.floor}階 / ${property.totalFloors}階建`,
      icon: Layers,
    },
    { label: "建物タイプ", value: property.buildingType, icon: Building2 },
    { label: "築年数", value: formatBuildAge(property.yearBuilt), icon: Calendar },
    { label: "敷金", value: property.deposit > 0 ? `${property.deposit}ヶ月` : "なし" },
    { label: "礼金", value: property.keyMoney > 0 ? `${property.keyMoney}ヶ月` : "なし" },
    {
      label: "最寄駅",
      value: `${property.nearestStation} ${formatWalkMinutes(property.walkMinutes)}`,
      icon: Train,
    },
    { label: "住所", value: property.address, icon: MapPin },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back navigation */}
      <Link
        href="/rooms"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        物件一覧に戻る
      </Link>

      {/* Image Gallery */}
      <div className="space-y-3">
        {/* Main image */}
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-card border border-border">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <Building2 className="w-16 h-16 opacity-40" />
            <span className="text-lg font-medium opacity-60">
              {property.title}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          {/* Badge overlay */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
              {property.layout}
            </Badge>
            <Badge className="bg-black/50 text-white backdrop-blur-sm border-0">
              {property.buildingType}
            </Badge>
          </div>
        </div>

        {/* Thumbnail row */}
        <div className="grid grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground"
            >
              <Building2 className="w-6 h-6 opacity-30" />
            </div>
          ))}
        </div>
      </div>

      {/* Property Header */}
      <div className="mt-8 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        {/* Left: Info */}
        <div className="space-y-2 min-w-0">
          <h1 className="text-2xl font-bold">{property.title}</h1>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="text-sm">{property.address}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Train className="w-4 h-4 shrink-0" />
            <span className="text-sm">
              {property.nearestStation}{" "}
              {formatWalkMinutes(property.walkMinutes)}
            </span>
          </div>
        </div>

        {/* Right: Rent + Actions */}
        <div className="shrink-0 space-y-3">
          <div className="text-right">
            <div className="flex items-baseline justify-end gap-1.5">
              <span className="text-3xl font-bold font-[family-name:var(--font-inter)] tabular-nums">
                {formatRent(property.rent)}
              </span>
              <span className="text-sm text-muted-foreground">
                / 管理費 {formatRent(property.managementFee)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              敷金 {property.deposit > 0 ? `${property.deposit}ヶ月` : "なし"}{" "}
              / 礼金{" "}
              {property.keyMoney > 0 ? `${property.keyMoney}ヶ月` : "なし"}
            </p>
          </div>

          <div className="flex items-center gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleFavorite(property.id)}
              className={
                favorited
                  ? "border-gold/50 text-gold hover:text-gold"
                  : ""
              }
            >
              <Heart
                className={`w-4 h-4 mr-1.5 ${
                  favorited ? "fill-gold text-gold" : ""
                }`}
              />
              お気に入り
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                comparing
                  ? removeFromCompare(property.id)
                  : addToCompare(property.id)
              }
              className={
                comparing
                  ? "border-primary/50 text-primary hover:text-primary"
                  : ""
              }
            >
              <GitCompareArrows className="w-4 h-4 mr-1.5" />
              {comparing ? "比較中" : "比較に追加"}
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Property Details Table */}
      <section>
        <h2 className="text-lg font-bold mb-4">物件詳細</h2>
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8">
            {detailItems.map((item, index) => (
              <div
                key={item.label}
                className={`flex justify-between items-center py-3 ${
                  index < detailItems.length - 1
                    ? "border-b border-border"
                    : ""
                } ${
                  // On desktop 2-col, remove bottom border for last items in each column
                  index === detailItems.length - 2
                    ? "md:border-b-0"
                    : ""
                }`}
              >
                <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </span>
                <span className="text-sm text-foreground font-medium">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      {property.features.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-bold mb-4">設備・特徴</h2>
          <div className="flex flex-wrap gap-2">
            {property.features.map((feature) => (
              <Badge
                key={feature}
                variant="secondary"
                className="text-sm px-3 py-1"
              >
                {feature}
              </Badge>
            ))}
          </div>
        </section>
      )}

      {/* Related Properties */}
      {relatedProperties.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-bold mb-4">周辺のおすすめ物件</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
