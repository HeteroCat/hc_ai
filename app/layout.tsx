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
    default: "Jason Huang｜AI Builder & Creator",
    template: "%s｜Jason Huang",
  },
  description: "Jason Huang 的个人主页，记录 AI 项目、文章、开源共创与持续生长的想法。",
  openGraph: {
    title: "Jason Huang",
    description: "AI 项目、文章与持续生长的想法。",
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
