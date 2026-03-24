import { MapPin } from "lucide-react"
import { Area } from "@/lib/types"
import { formatRent } from "@/lib/utils"

type AreaHeroProps = {
  area: Area
}

export function AreaHero({ area }: AreaHeroProps) {
  return (
    <div className="relative h-64 md:h-80 rounded-xl overflow-hidden bg-card border border-border">
      {/* Background placeholder */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 via-card to-card">
        <MapPin className="w-24 h-24 text-muted-foreground/20" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          {area.name}
        </h1>
        <p className="text-muted-foreground mt-1">
          平均家賃 {formatRent(area.avgRent)}
        </p>
      </div>
    </div>
  )
}
