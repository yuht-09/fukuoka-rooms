import Link from "next/link"
import { Building2, MapPin, LayoutGrid, Phone, Mail, HelpCircle } from "lucide-react"

const searchLinks = [
  { href: "/rooms", label: "すべての物件", icon: Building2 },
  { href: "/areas", label: "エリアから探す", icon: MapPin },
  { href: "/rooms?layout=1K", label: "間取りから探す", icon: LayoutGrid },
]

const supportLinks = [
  { href: "#", label: "よくある質問", icon: HelpCircle },
  { href: "#", label: "お問い合わせ", icon: Mail },
  { href: "#", label: "電話相談", icon: Phone },
]

export function Footer() {
  return (
    <footer className="relative bg-[#0c0c14] mt-auto">
      {/* Top accent gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.03)_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        {/* Grid columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-0.5 font-heading font-bold text-xl tracking-tight"
            >
              <span className="text-white">Fukuoka</span>
              <span className="mx-1 text-primary/30 text-lg select-none">/</span>
              <span className="text-primary font-extrabold">Rooms</span>
            </Link>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-xs">
              福岡に特化したプレミアム賃貸検索サイト。
              あなたにぴったりのお部屋を、快適に見つけましょう。
            </p>
            {/* Decorative dots */}
            <div className="flex items-center gap-1.5 mt-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/25" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/15" />
            </div>
          </div>

          {/* Column 2: 物件を探す */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/60 mb-4">
              物件を探す
            </h3>
            <ul className="space-y-3">
              {searchLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <link.icon className="w-3.5 h-3.5 text-primary/40 group-hover:text-primary/70 transition-colors duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: サポート */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/60 mb-4">
              サポート
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <link.icon className="w-3.5 h-3.5 text-primary/40 group-hover:text-primary/70 transition-colors duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: お気に入り & 比較 */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/60 mb-4">
              マイページ
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/favorites"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  お気に入り一覧
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  物件を比較する
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} Fukuoka Rooms. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60 flex items-center gap-1">
            Made with
            <span className="text-primary/70 mx-0.5">&hearts;</span>
            in Fukuoka
          </p>
        </div>
      </div>
    </footer>
  )
}
