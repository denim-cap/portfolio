import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio | Takuya Yamaguchi",
  description: "Webクリエイター/デベロッパー Takuya Yamaguchiのポートフォリオサイト",
  icons: {
    icon: '/favicon_d.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
