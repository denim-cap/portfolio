import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
