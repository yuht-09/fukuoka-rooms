"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, GitCompareArrows, Menu } from "lucide-react"
import { useFavorites } from "@/context/favorites-context"
import { useCompare } from "@/context/compare-context"

const navLinks = [
  { href: "/rooms", label: "物件を探す" },
  { href: "/areas", label: "エリアガイド" },
]

export function Header() {
  const pathname = usePathname()
  const { favorites } = useFavorites()
  const { compareIds } = useCompare()

  const favCount = favorites.length
  const compareCount = compareIds.length

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/")

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-inter font-bold text-xl tracking-tight">
          Fukuoka <span className="text-primary">Rooms</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Favorites */}
          <Link
            href="/favorites"
            className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1.5 ${
              isActive("/favorites")
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>お気に入り</span>
            {favCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 rounded-full bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center font-medium">
                {favCount}
              </span>
            )}
          </Link>

          {/* Compare */}
          <Link
            href="/compare"
            className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1.5 ${
              isActive("/compare")
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <GitCompareArrows className="w-4 h-4" />
            <span>比較</span>
            {compareCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 rounded-full bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center font-medium">
                {compareCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
          aria-label="メニューを開く"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
