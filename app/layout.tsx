import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Takuya Yamaguchi / denimcap - Web Creator & Developer",
  description: "あなたのビジネスを、Webで加速させる。Webサイト制作、LP制作、レスポンシブ対応、保守・運用サポートを提供します。",
  keywords: ["Web制作", "Webサイト制作", "LP制作", "Next.js", "React", "ポートフォリオ"],
  authors: [{ name: "Takuya Yamaguchi", url: "https://denimcap.work" }],
  creator: "Takuya Yamaguchi",
  publisher: "denimcap",
  openGraph: {
    title: "Takuya Yamaguchi / denimcap - Web Creator & Developer",
    description: "あなたのビジネスを、Webで加速させる。Webサイト制作、LP制作、レスポンシブ対応、保守・運用サポートを提供します。",
    url: "https://denimcap.work",
    siteName: "denimcap",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Takuya Yamaguchi / denimcap - Web Creator & Developer",
    description: "あなたのビジネスを、Webで加速させる。",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
