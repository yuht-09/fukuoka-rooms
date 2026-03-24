"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, GitCompareArrows, Menu, X } from "lucide-react"
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const favCount = favorites.length
  const compareCount = compareIds.length

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/")

  return (
    <>
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
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile menu panel */}
      <div
        className={`fixed inset-y-0 right-0 w-72 bg-card border-l border-border z-50 md:hidden transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-end p-4">
          <button
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="メニューを閉じる"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-4 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-foreground bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Favorites */}
          <Link
            href="/favorites"
            onClick={() => setMobileMenuOpen(false)}
            className={`relative px-3 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              isActive("/favorites")
                ? "text-foreground bg-secondary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>お気に入り</span>
            {favCount > 0 && (
              <span className="rounded-full bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center font-medium ml-auto">
                {favCount}
              </span>
            )}
          </Link>

          {/* Compare */}
          <Link
            href="/compare"
            onClick={() => setMobileMenuOpen(false)}
            className={`relative px-3 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              isActive("/compare")
                ? "text-foreground bg-secondary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <GitCompareArrows className="w-4 h-4" />
            <span>比較</span>
            {compareCount > 0 && (
              <span className="rounded-full bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center font-medium ml-auto">
                {compareCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </>
  )
}
