import type { Metadata } from "next"
import Image from "next/image"
import { ArrowUpRightIcon } from "lucide-react"

import { certificates, honors, socialLinks } from "@/lib/site-content"
import { PageHero } from "@/components/page-hero"
import { SectionHeading } from "@/components/section-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "关于我",
  description: "了解 Jason AI 与 Jason Huang 的项目、经历、荣誉和创作方向。",
}

export default function AboutPage() {
  return (
    <main>
      <PageHero eyebrow="关于我" title="你好，我是 Jason Huang" description="AI 工程师、AI 内容创作者与开源贡献者。我喜欢把复杂概念讲清楚，也喜欢把新想法做成可以运行的产品。" />
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
        <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl border">
          <Image src="/Jason-img.jpeg" alt="Jason Huang" fill className="object-cover" priority />
        </div>
        <div className="flex flex-col gap-8">
          <SectionHeading title="学习、共创、交付" description="从大模型应用、智能体到 AI 影像，我持续通过开源项目、文章与产品验证自己的理解。这个网站会把分散的作品重新组织成可以学习、浏览和合作的路径。" />
          <div className="flex flex-wrap gap-2">
            {honors.map((item) => <Badge key={item} variant="secondary">{item}</Badge>)}
          </div>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((item) => (
              <Button key={item.title} variant="outline" asChild>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.title}
                  <ArrowUpRightIcon data-icon="inline-end" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </section>
      <section className="border-y bg-card/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading title="证书与经历" description="这些资料用于补充专业背景，不替代真实项目与作品。" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate) => (
              <Card key={certificate.src} className="overflow-hidden py-0">
                <CardContent className="relative aspect-[3/2] px-0">
                  <Image src={certificate.src} alt={certificate.alt} fill className="object-cover" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
