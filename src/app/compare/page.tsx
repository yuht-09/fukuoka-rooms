"use client"

import Link from "next/link"
import { GitCompareArrows, ArrowRight } from "lucide-react"
import { useCompare } from "@/context/compare-context"
import { EmptyState } from "@/components/shared/empty-state"
import { CompareTable } from "@/components/compare/compare-table"

export default function ComparePage() {
  const { compareIds } = useCompare()

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">物件比較</h1>

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
          <div className="mt-6 text-center">
            <Link
              href="/favorites"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              お気に入りから追加する
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
