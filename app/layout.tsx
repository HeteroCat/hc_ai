import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SplashCursor from "@/components/SplashCursor";
import { SiteHeader } from "@/components/site-header";

const geistSans = localFont({
  src: "./fonts/Geist.woff2",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMono.woff2",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Jason AI｜AI 学习、实战与企业落地平台",
    template: "%s｜Jason AI",
  },
  description: "通过 AI 知识、真实项目、培训与企业服务，连接学习、实践和业务落地。",
  openGraph: {
    title: "Jason AI",
    description: "AI 学习、实战与企业落地平台",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <SplashCursor />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
