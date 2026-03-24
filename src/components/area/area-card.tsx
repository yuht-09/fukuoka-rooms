import Link from "next/link"
import { MapPin } from "lucide-react"
import { Area } from "@/lib/types"
import { formatRent } from "@/lib/utils"

type AreaCardProps = {
  area: Area
}

export function AreaCard({ area }: AreaCardProps) {
  return (
    <Link
      href={`/areas/${area.slug}`}
      className="group relative block rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300"
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <MapPin className="w-10 h-10" />
          <span className="text-sm">{area.name}</span>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/60 group-hover:via-black/10 transition-all duration-300" />

        {/* Content overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white">{area.name}</h3>
          <p className="text-sm text-white/70 mt-0.5">
            平均 {formatRent(area.avgRent)}
          </p>
        </div>
      </div>
    </Link>
  )
}
