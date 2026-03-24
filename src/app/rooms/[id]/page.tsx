"use client"

import { use, useState } from "react"
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
  const [selectedThumb, setSelectedThumb] = useState(0)
  const [justFavorited, setJustFavorited] = useState(false)

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

  // Deterministic pattern seed from property id (same approach as PropertyCard)
  const seed = property.id.charCodeAt(0) + (property.id.charCodeAt(1) || 0)
  const hueA = (seed * 37) % 360
  const hueB = (hueA + 60) % 360

  const handleFavoriteClick = () => {
    toggleFavorite(property.id)
    if (!favorited) {
      setJustFavorited(true)
      setTimeout(() => setJustFavorited(false), 600)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back navigation */}
      <Link
        href="/rooms"
        className="group/back inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-300 mb-8"
      >
        <span className="flex items-center justify-center w-8 h-8 rounded-full border border-border bg-card group-hover/back:border-primary/40 group-hover/back:bg-primary/5 transition-all duration-300">
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover/back:-translate-x-0.5" />
        </span>
        <span className="transition-colors duration-300">物件一覧に戻る</span>
      </Link>

      {/* Image Gallery - cinematic aspect ratio */}
      <div className="space-y-3">
        {/* Main image */}
        <div className="relative aspect-[2/1] rounded-2xl overflow-hidden bg-card border border-border/50">
          {/* Abstract architectural SVG pattern */}
          <div className="absolute inset-0">
            <svg
              viewBox="0 0 800 400"
              className="h-full w-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id={`detail-grad-${property.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={`hsl(${hueA}, 30%, 12%)`} />
                  <stop offset="50%" stopColor={`hsl(${(hueA + hueB) / 2}, 25%, 8%)`} />
                  <stop offset="100%" stopColor={`hsl(${hueB}, 30%, 10%)`} />
                </linearGradient>
                <radialGradient id={`detail-glow-${property.id}`} cx="30%" cy="40%" r="60%">
                  <stop offset="0%" stopColor={`hsl(${hueA}, 40%, 18%)`} stopOpacity="0.4" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <linearGradient id={`detail-accent-${property.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={`hsl(${hueA}, 50%, 30%)`} stopOpacity="0.6" />
                  <stop offset="100%" stopColor={`hsl(${hueA}, 50%, 15%)`} stopOpacity="0.1" />
                </linearGradient>
              </defs>
              {/* Base gradient */}
              <rect width="800" height="400" fill={`url(#detail-grad-${property.id})`} />
              <rect width="800" height="400" fill={`url(#detail-glow-${property.id})`} />

              {/* Grid mesh pattern */}
              {Array.from({ length: 20 }, (_, i) => (
                <line
                  key={`vline-${i}`}
                  x1={i * 42}
                  y1="0"
                  x2={i * 42}
                  y2="400"
                  stroke={`hsl(${hueA}, 30%, 16%)`}
                  strokeWidth="0.3"
                  opacity="0.5"
                />
              ))}
              {Array.from({ length: 10 }, (_, i) => (
                <line
                  key={`hline-${i}`}
                  x1="0"
                  y1={i * 42}
                  x2="800"
                  y2={i * 42}
                  stroke={`hsl(${hueA}, 30%, 16%)`}
                  strokeWidth="0.3"
                  opacity="0.5"
                />
              ))}

              {/* Architectural structures */}
              <rect x="80" y="400" width="4" height="-300" fill={`hsl(${hueA}, 40%, 22%)`} opacity="0.5" />
              <rect x="160" y="400" width="3" height="-340" fill={`hsl(${hueA}, 40%, 20%)`} opacity="0.4" />

              <rect x="170" y="80" width="100" height="320" fill={`hsl(${hueA}, 30%, 13%)`} rx="2" />
              <rect x="290" y="120" width="130" height="280" fill={`hsl(${hueB}, 30%, 11%)`} rx="2" />
              <rect x="440" y="160" width="90" height="240" fill={`hsl(${hueA}, 25%, 14%)`} rx="2" />
              <rect x="560" y="100" width="110" height="300" fill={`hsl(${hueB}, 28%, 12%)`} rx="2" />
              <rect x="690" y="180" width="70" height="220" fill={`hsl(${hueA}, 30%, 13%)`} rx="2" />

              {/* Window patterns - building 1 */}
              {[185, 205, 225, 245].map((x) =>
                [100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350].map((y) => (
                  <rect
                    key={`w1-${x}-${y}`}
                    x={x}
                    y={y}
                    width="8"
                    height="10"
                    rx="1"
                    fill={`hsl(${hueA}, 45%, ${17 + ((x + y) % 6)}%)`}
                  />
                ))
              )}
              {/* Window patterns - building 2 */}
              {[310, 335, 360, 385].map((x) =>
                [145, 170, 195, 220, 245, 270, 295, 320, 345].map((y) => (
                  <rect
                    key={`w2-${x}-${y}`}
                    x={x}
                    y={y}
                    width="9"
                    height="11"
                    rx="1"
                    fill={`hsl(${hueB}, 45%, ${16 + ((x + y) % 5)}%)`}
                  />
                ))
              )}
              {/* Window patterns - building 3 */}
              {[575, 600, 625, 645].map((x) =>
                [125, 150, 175, 200, 225, 250, 275, 300, 325, 350].map((y) => (
                  <rect
                    key={`w3-${x}-${y}`}
                    x={x}
                    y={y}
                    width="7"
                    height="10"
                    rx="1"
                    fill={`hsl(${hueB}, 40%, ${17 + ((x * y) % 5)}%)`}
                  />
                ))
              )}

              {/* Accent light beams */}
              <rect x="168" y="76" width="104" height="3" fill={`url(#detail-accent-${property.id})`} rx="1" />
              <rect x="288" y="116" width="134" height="3" fill={`url(#detail-accent-${property.id})`} rx="1" />
              <rect x="558" y="96" width="114" height="3" fill={`url(#detail-accent-${property.id})`} rx="1" />
            </svg>
          </div>

          {/* Dramatic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/40 via-transparent to-[#0a0a0f]/40" />

          {/* Badge overlay */}
          <div className="absolute bottom-5 left-5 flex items-center gap-2">
            <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm text-xs px-3 py-1">
              {property.layout}
            </Badge>
            <Badge className="bg-black/50 text-white backdrop-blur-sm border-0 text-xs px-3 py-1">
              {property.buildingType}
            </Badge>
          </div>

          {/* Property name on image */}
          <div className="absolute bottom-5 right-5">
            <span className="text-white/40 text-sm font-medium tracking-wider">
              {property.title}
            </span>
          </div>
        </div>

        {/* Thumbnail row */}
        <div className="grid grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedThumb(i)}
              className={`relative aspect-square rounded-lg overflow-hidden bg-card flex items-center justify-center text-muted-foreground transition-all duration-300 hover:scale-[1.03] ${
                selectedThumb === i
                  ? "ring-2 ring-primary shadow-[0_0_12px_rgba(99,102,241,0.3)]"
                  : "border border-border/50 hover:border-border"
              }`}
            >
              {/* Mini SVG pattern */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full opacity-40"
                preserveAspectRatio="xMidYMid slice"
              >
                <rect width="100" height="100" fill={`hsl(${(hueA + i * 30) % 360}, 25%, 10%)`} />
                <rect x={20 + i * 5} y={30} width={25} height={70} fill={`hsl(${(hueA + i * 30) % 360}, 25%, 14%)`} rx="1" />
                <rect x={50 + i * 3} y={40} width={20} height={60} fill={`hsl(${(hueB + i * 20) % 360}, 25%, 12%)`} rx="1" />
              </svg>
              <Building2 className="w-5 h-5 opacity-30 relative z-10" />
              {selectedThumb === i && (
                <div className="absolute inset-0 bg-primary/5" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Property Header */}
      <div className="mt-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        {/* Left: Info */}
        <div className="space-y-3 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{property.title}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10">
              <MapPin className="w-3.5 h-3.5 text-primary" />
            </span>
            <span className="text-sm">{property.address}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10">
              <Train className="w-3.5 h-3.5 text-primary" />
            </span>
            <span className="text-sm">
              {property.nearestStation}{" "}
              {formatWalkMinutes(property.walkMinutes)}
            </span>
          </div>
        </div>

        {/* Right: Rent + Actions */}
        <div className="shrink-0 space-y-4">
          <div className="text-right">
            <div className="flex items-baseline justify-end gap-2">
              <span
                className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-inter)] tabular-nums"
                style={{
                  background: "linear-gradient(135deg, #ffffff 30%, var(--gold) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {formatRent(property.rent)}
              </span>
              <span className="text-sm text-muted-foreground">
                / 管理費 {formatRent(property.managementFee)}
              </span>
            </div>
            {/* Price accent line */}
            <div className="flex justify-end mt-2">
              <div className="h-0.5 w-24 rounded-full bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              敷金 {property.deposit > 0 ? `${property.deposit}ヶ月` : "なし"}{" "}
              / 礼金{" "}
              {property.keyMoney > 0 ? `${property.keyMoney}ヶ月` : "なし"}
            </p>
          </div>

          <div className="flex items-center gap-3 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleFavoriteClick}
              className={`relative overflow-hidden transition-all duration-300 ${
                favorited
                  ? "border-[var(--gold)]/50 text-[var(--gold)] hover:text-[var(--gold)] shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                  : "hover:border-[var(--gold)]/30 hover:shadow-[0_0_10px_rgba(245,158,11,0.1)]"
              }`}
            >
              <Heart
                className={`w-4 h-4 mr-1.5 transition-all duration-300 ${
                  favorited ? "fill-[var(--gold)] text-[var(--gold)]" : ""
                } ${justFavorited ? "animate-pulse scale-125" : ""}`}
                style={favorited ? { filter: "drop-shadow(0 0 6px var(--gold))" } : undefined}
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
              className={`relative overflow-hidden transition-all duration-300 ${
                comparing
                  ? "border-primary/50 text-primary hover:text-primary shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                  : "hover:border-primary/30 hover:shadow-[0_0_10px_rgba(99,102,241,0.1)]"
              }`}
            >
              <GitCompareArrows className={`w-4 h-4 mr-1.5 transition-transform duration-300 ${comparing ? "rotate-180" : ""}`} />
              {comparing ? "比較中" : "比較に追加"}
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-10" />

      {/* Property Details Table */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-lg font-bold">物件詳細</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
        </div>
        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {detailItems.map((item, index) => (
              <div
                key={item.label}
                className={`flex justify-between items-center px-6 py-4 transition-colors duration-200 hover:bg-white/[0.02] ${
                  index % 2 === 0 ? "bg-transparent" : "bg-white/[0.01]"
                } ${
                  index < detailItems.length - 1
                    ? "border-b border-border/30"
                    : ""
                } ${
                  index === detailItems.length - 2
                    ? "md:border-b-0"
                    : ""
                }`}
              >
                <span className="text-sm text-muted-foreground flex items-center gap-2.5">
                  {item.icon && (
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10">
                      <item.icon className="w-3.5 h-3.5 text-primary" />
                    </span>
                  )}
                  {!item.icon && <span className="w-7" />}
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
        <section className="mt-10">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-lg font-bold">設備・特徴</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
          </div>
          {/* Decorative dot grid */}
          <div className="relative">
            <div className="flex flex-wrap gap-2.5">
              {property.features.map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center text-sm px-4 py-1.5 rounded-full bg-transparent text-muted-foreground border border-border/50 hover:border-primary/30 hover:text-foreground transition-all duration-300"
                  style={{
                    backgroundImage: "linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(245,158,11,0.03) 100%)",
                  }}
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Properties */}
      {relatedProperties.length > 0 && (
        <section className="mt-16">
          {/* Decorative gradient separator */}
          <div className="mb-10">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-primary/60 uppercase">
              Related
            </span>
            <h2 className="text-lg font-bold">周辺のおすすめ物件</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-border/50 to-transparent" />
          </div>
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
