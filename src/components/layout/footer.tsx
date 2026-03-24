import Link from "next/link"

const footerLinks = [
  { href: "/rooms", label: "物件を探す" },
  { href: "/areas", label: "エリアガイド" },
  { href: "/favorites", label: "お気に入り" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top: Logo + description */}
        <div className="mb-8">
          <Link href="/" className="font-inter font-bold text-xl tracking-tight">
            Fukuoka <span className="text-primary">Rooms</span>
          </Link>
          <p className="mt-3 text-muted-foreground text-sm max-w-md leading-relaxed">
            福岡に特化したプレミアム賃貸検索サイト。
            あなたにぴったりのお部屋を、快適に見つけましょう。
          </p>
        </div>

        {/* Middle: nav links */}
        <nav className="flex flex-wrap gap-6 mb-8">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="border-t border-border pt-6">
          <p className="text-muted-foreground text-sm">
            &copy; 2024 Fukuoka Rooms
          </p>
        </div>
      </div>
    </footer>
  )
}
