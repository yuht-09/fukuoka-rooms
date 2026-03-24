import { MapPin } from "lucide-react"
import { Area } from "@/lib/types"
import { formatRent } from "@/lib/utils"

type AreaHeroProps = {
  area: Area
}

export function AreaHero({ area }: AreaHeroProps) {
  const seed = area.slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const hueA = (seed * 47) % 360
  const hueB = (hueA + 90) % 360

  return (
    <div className="relative h-72 md:h-96 rounded-lg overflow-hidden bg-card border border-border">
      {/* Dramatic gradient background */}
      <div className="absolute inset-0">
        <svg viewBox="0 0 1200 500" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id={`hero-a-${area.slug}`} cx="20%" cy="50%" r="60%">
              <stop offset="0%" stopColor={`hsl(${hueA}, 50%, 16%)`} />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id={`hero-b-${area.slug}`} cx="80%" cy="30%" r="50%">
              <stop offset="0%" stopColor={`hsl(${hueB}, 40%, 12%)`} />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id={`hero-c-${area.slug}`} cx="50%" cy="80%" r="40%">
              <stop offset="0%" stopColor="hsla(240, 40%, 14%, 0.6)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="1200" height="500" fill="#0d0d18" />
          <rect width="1200" height="500" fill={`url(#hero-a-${area.slug})`} />
          <rect width="1200" height="500" fill={`url(#hero-b-${area.slug})`} />
          <rect width="1200" height="500" fill={`url(#hero-c-${area.slug})`} />
          {/* Geometric accents */}
          <line x1="0" y1="250" x2="1200" y2="250" stroke={`hsl(${hueA}, 30%, 18%)`} strokeWidth="0.5" />
          <line x1="0" y1="350" x2="1200" y2="350" stroke={`hsl(${hueB}, 25%, 16%)`} strokeWidth="0.3" />
          <circle cx="200" cy="200" r="80" fill="none" stroke={`hsl(${hueA}, 30%, 16%)`} strokeWidth="0.5" />
          <circle cx="900" cy="150" r="120" fill="none" stroke={`hsl(${hueB}, 25%, 14%)`} strokeWidth="0.3" />
        </svg>
      </div>

      {/* Pattern overlay - diagonal lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 20px, currentColor 20px, currentColor 21px)",
        }}
      />

      {/* MapPin decorative */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <MapPin className="w-32 h-32 text-muted-foreground/[0.06]" />
      </div>

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        {/* Decorative line */}
        <div className="w-12 h-px bg-gradient-to-r from-primary to-gold mb-4" />

        <h1
          className="text-3xl md:text-5xl font-bold text-white tracking-wider"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
        >
          {area.name}
        </h1>
        <p className="text-muted-foreground mt-2 text-sm md:text-base tracking-wide">
          平均家賃 {formatRent(area.avgRent)}
        </p>
      </div>
    </div>
  )
}
