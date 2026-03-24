"use client"

import Link from "next/link"
import { GitCompareArrows, ArrowRight, Sparkles } from "lucide-react"
import { useCompare } from "@/context/compare-context"
import { EmptyState } from "@/components/shared/empty-state"
import { CompareTable } from "@/components/compare/compare-table"

export default function ComparePage() {
  const { compareIds } = useCompare()

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Page header */}
      <div className="relative mb-10">
        {/* Decorative accent */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <p className="text-xs text-indigo-400 tracking-widest font-medium">COMPARE</p>
          </div>
          <h1 className="text-2xl font-bold text-gray-100">物件比較</h1>
          <p className="text-sm text-gray-500 mt-1.5">
            気になる物件を並べて、最適な一室を見つけましょう
          </p>
          {compareIds.length > 0 && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#14141f] border border-[#1e1e2e]">
              <GitCompareArrows className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs text-gray-400">
                <span className="text-indigo-400 font-semibold">{compareIds.length}件</span>を比較中
              </span>
            </div>
          )}
        </div>
        {/* Decorative line */}
        <div className="mt-6 h-px bg-gradient-to-r from-indigo-500/50 via-violet-500/30 to-transparent" />
      </div>

      {compareIds.length === 0 ? (
        <EmptyState
          icon={<GitCompareArrows />}
          title="比較する物件がありません"
          description="お気に入りから物件を選んで比較しましょう"
          actionLabel="お気に入りへ"
          actionHref="/favorites"
        />
      ) : (
        <>
          <CompareTable propertyIds={compareIds} />
          <div className="mt-8 text-center">
            <Link
              href="/favorites"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-gray-400 hover:text-indigo-300 bg-[#14141f] border border-[#1e1e2e] hover:border-indigo-500/30 transition-all duration-300"
            >
              お気に入りから追加する
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
