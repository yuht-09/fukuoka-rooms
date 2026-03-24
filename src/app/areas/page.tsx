import { areas } from "@/data/areas"
import { AreaCard } from "@/components/area/area-card"

export default function AreasPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div>
        <p className="text-xs text-primary tracking-widest">AREA GUIDE</p>
        <h1 className="text-2xl font-bold mt-1">福岡エリアガイド</h1>
        <p className="text-muted-foreground mt-1">
          各エリアの特徴や雰囲気をチェック
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {areas.map((area) => (
          <AreaCard key={area.slug} area={area} />
        ))}
      </div>
    </div>
  )
}
