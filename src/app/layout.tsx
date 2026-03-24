import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from "@/context/favorites-context";
import { CompareProvider } from "@/context/compare-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "Fukuoka Rooms | 福岡のお部屋探し",
  description: "福岡に特化した賃貸お部屋探しサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${notoSansJP.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <FavoritesProvider>
          <CompareProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CompareProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
