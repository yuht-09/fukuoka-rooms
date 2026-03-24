import { MapPin, Compass } from "lucide-react"
import { areas } from "@/data/areas"
import { AreaCard } from "@/components/area/area-card"

export default function AreasPage() {
  return (
    <div className="relative">
      {/* Hero-like header with gradient background */}
      <div className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[#0a0a0f]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0a0a0f] to-[#0a0a0f]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(99 102 241 / 0.4) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 pt-12 pb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4 text-indigo-400" />
              <p className="text-xs text-indigo-400 tracking-widest font-medium">AREA GUIDE</p>
            </div>
            <h1 className="text-3xl font-bold text-gray-100">
              福岡エリアガイド
            </h1>
            <p className="text-gray-400 mt-3 leading-relaxed text-base">
              天神の洗練されたシティライフから、大濠公園の静寂まで。
              <br className="hidden sm:block" />
              それぞれのエリアが持つ個性を探り、あなたらしい暮らしを見つけてください。
            </p>
          </div>
        </div>

        {/* Decorative elements between header and grid */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-indigo-500/40 via-violet-500/20 to-transparent" />
            <MapPin className="w-3.5 h-3.5 text-indigo-500/40" />
            <div className="h-px flex-1 bg-gradient-to-l from-indigo-500/40 via-violet-500/20 to-transparent" />
          </div>
        </div>
      </div>

      {/* Grid - alternating sizes */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {areas.map((area, i) => (
            <div
              key={area.slug}
              className={i < 2 ? "lg:col-span-2" : "lg:col-span-2 xl:col-span-1"}
            >
              <AreaCard area={area} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
