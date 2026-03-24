import Link from "next/link"
import { MapPin } from "lucide-react"
import { Area } from "@/lib/types"
import { formatRent } from "@/lib/utils"

type AreaCardProps = {
  area: Area
}

export function AreaCard({ area }: AreaCardProps) {
  // Deterministic colors from slug
  const seed = area.slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const hueA = (seed * 47) % 360
  const hueB = (hueA + 90) % 360

  return (
    <Link
      href={`/areas/${area.slug}`}
      className="group relative block overflow-hidden rounded-lg border border-border hover:border-transparent transition-all duration-500"
    >
      {/* Hover gradient border */}
      <div
        className="pointer-events-none absolute -inset-px z-10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, hsl(${hueA}, 50%, 40%), hsl(${hueB}, 50%, 40%))`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Image area with gradient mesh */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <div className="absolute inset-0">
          <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id={`mesh-a-${area.slug}`} cx="30%" cy="40%" r="60%">
                <stop offset="0%" stopColor={`hsl(${hueA}, 40%, 18%)`} />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <radialGradient id={`mesh-b-${area.slug}`} cx="70%" cy="60%" r="50%">
                <stop offset="0%" stopColor={`hsl(${hueB}, 35%, 15%)`} />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <rect width="400" height="300" fill="#10101a" />
            <rect width="400" height="300" fill={`url(#mesh-a-${area.slug})`} />
            <rect width="400" height="300" fill={`url(#mesh-b-${area.slug})`} />
            {/* Abstract map-like lines */}
            <path
              d={`M0,${150 + (seed % 50)} Q100,${100 + (seed % 80)} 200,${160 + (seed % 40)} T400,${140 + (seed % 60)}`}
              fill="none"
              stroke={`hsl(${hueA}, 30%, 22%)`}
              strokeWidth="1"
            />
            <path
              d={`M0,${180 + (seed % 30)} Q150,${200 + (seed % 50)} 300,${170 + (seed % 40)} T400,${190 + (seed % 30)}`}
              fill="none"
              stroke={`hsl(${hueB}, 25%, 20%)`}
              strokeWidth="0.5"
            />
            <circle cx={100 + (seed % 80)} cy={120 + (seed % 60)} r="2" fill={`hsl(${hueA}, 50%, 35%)`} />
            <circle cx={250 + (seed % 60)} cy={160 + (seed % 40)} r="1.5" fill={`hsl(${hueB}, 50%, 30%)`} />
          </svg>
        </div>

        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
          <MapPin className="w-8 h-8" />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/30 to-transparent" />

        {/* Hover shimmer */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white tracking-wide">
            {area.name}
          </h3>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-sm text-white/60">
              平均 {formatRent(area.avgRent)}
            </p>
          </div>
          {/* Revealed on hover */}
          <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-8 group-hover:opacity-100 group-hover:mt-1.5">
            {area.highlights && area.highlights.length > 0 && (
              <p className="text-xs text-white/40">
                {area.highlights.slice(0, 2).join(" / ")}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
