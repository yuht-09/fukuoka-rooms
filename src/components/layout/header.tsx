"use client"

import { useState, useEffect, useRef } from "react"
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
  const [scrolled, setScrolled] = useState(false)
  const prevFavCount = useRef(favorites.length)
  const prevCompareCount = useRef(compareIds.length)
  const [favPulse, setFavPulse] = useState(false)
  const [comparePulse, setComparePulse] = useState(false)

  const favCount = favorites.length
  const compareCount = compareIds.length

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Pulse animation on first add
  useEffect(() => {
    if (favCount > 0 && prevFavCount.current === 0) {
      setFavPulse(true)
      const t = setTimeout(() => setFavPulse(false), 600)
      return () => clearTimeout(t)
    }
    prevFavCount.current = favCount
  }, [favCount])

  useEffect(() => {
    if (compareCount > 0 && prevCompareCount.current === 0) {
      setComparePulse(true)
      const t = setTimeout(() => setComparePulse(false), 600)
      return () => clearTimeout(t)
    }
    prevCompareCount.current = compareCount
  }, [compareCount])

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/")

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0f]/85 backdrop-blur-xl shadow-[0_1px_24px_rgba(99,102,241,0.06)]"
            : "bg-[#0a0a0f]/60 backdrop-blur-md"
        }`}
      >
        {/* Gradient accent line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group relative font-heading font-bold text-xl tracking-tight flex items-center gap-0.5"
          >
            <span className="relative z-10 text-white transition-colors duration-200">
              Fukuoka
            </span>
            <span className="relative z-10 mx-1 text-primary/30 text-lg select-none">/</span>
            <span className="relative z-10 text-primary font-extrabold transition-colors duration-200">
              Rooms
            </span>
            {/* Glow on hover */}
            <span className="absolute -inset-x-3 -inset-y-2 rounded-xl bg-primary/0 group-hover:bg-primary/[0.06] blur-xl transition-all duration-500 pointer-events-none" />
            <span className="absolute -inset-x-2 -inset-y-1 rounded-lg bg-primary/0 group-hover:bg-primary/[0.04] transition-all duration-300 pointer-events-none" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 group ${
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {/* Animated underline */}
                <span
                  className={`absolute bottom-0.5 left-1/2 h-px bg-primary transition-all duration-300 ease-out ${
                    isActive(link.href)
                      ? "w-5 -translate-x-1/2 opacity-100"
                      : "w-0 -translate-x-1/2 opacity-0 group-hover:w-5 group-hover:opacity-60"
                  }`}
                />
              </Link>
            ))}

            <div className="w-px h-5 bg-border mx-2" />

            {/* Favorites */}
            <Link
              href="/favorites"
              className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 inline-flex items-center gap-1.5 group ${
                isActive("/favorites")
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Heart className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
              <span className="hidden lg:inline">お気に入り</span>
              {favCount > 0 && (
                <span
                  className={`absolute -top-0.5 -right-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold w-[18px] h-[18px] flex items-center justify-center ring-2 ring-[#0a0a0f]/80 transition-transform duration-300 ${
                    favPulse ? "animate-pulse scale-125" : "scale-100"
                  }`}
                >
                  {favCount}
                </span>
              )}
            </Link>

            {/* Compare */}
            <Link
              href="/compare"
              className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 inline-flex items-center gap-1.5 group ${
                isActive("/compare")
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <GitCompareArrows className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
              <span className="hidden lg:inline">比較</span>
              {compareCount > 0 && (
                <span
                  className={`absolute -top-0.5 -right-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold w-[18px] h-[18px] flex items-center justify-center ring-2 ring-[#0a0a0f]/80 transition-transform duration-300 ${
                    comparePulse ? "animate-pulse scale-125" : "scale-100"
                  }`}
                >
                  {compareCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all duration-200"
            aria-label="メニューを開く"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile menu backdrop */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileMenuOpen
            ? "bg-black/60 backdrop-blur-sm pointer-events-auto"
            : "bg-black/0 backdrop-blur-none pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile menu panel */}
      <div
        className={`fixed inset-y-0 right-0 w-72 bg-[#12121d]/95 backdrop-blur-2xl border-l border-white/[0.06] z-50 md:hidden transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header area */}
        <div className="flex items-center justify-between p-4 border-b border-white/[0.04]">
          <span className="font-heading font-bold text-sm tracking-tight text-white/60">
            Menu
          </span>
          <button
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all duration-200"
            aria-label="メニューを閉じる"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-3 pt-3 gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive(link.href)
                  ? "text-foreground bg-primary/[0.08] border-l-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="h-px bg-white/[0.04] my-2 mx-2" />

          {/* Favorites */}
          <Link
            href="/favorites"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-3 ${
              isActive("/favorites")
                ? "text-foreground bg-primary/[0.08] border-l-2 border-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>お気に入り</span>
            {favCount > 0 && (
              <span className="rounded-full bg-primary/15 text-primary text-xs font-semibold w-6 h-6 flex items-center justify-center ml-auto">
                {favCount}
              </span>
            )}
          </Link>

          {/* Compare */}
          <Link
            href="/compare"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-3 ${
              isActive("/compare")
                ? "text-foreground bg-primary/[0.08] border-l-2 border-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
            }`}
          >
            <GitCompareArrows className="w-4 h-4" />
            <span>比較</span>
            {compareCount > 0 && (
              <span className="rounded-full bg-primary/15 text-primary text-xs font-semibold w-6 h-6 flex items-center justify-center ml-auto">
                {compareCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </>
  )
}
