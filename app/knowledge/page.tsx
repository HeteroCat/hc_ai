import type { Metadata } from "next"

import { knowledgeItems } from "@/lib/site-content"
import { KnowledgeBrowser } from "@/components/knowledge-browser"
import { PageHero } from "@/components/page-hero"

export const metadata: Metadata = {
  title: "AI 知识库",
  description: "Agent、RAG、AI 编程、自动化与内容创作的学习入口。",
}

export default function KnowledgePage() {
  return (
    <main>
      <PageHero eyebrow="AI 知识库" title="先找到方向，再进入深度内容" description="网站提供分类、简介和学习地图；已开放内容会跳转到持续维护的文章或飞书文档。" />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <KnowledgeBrowser items={knowledgeItems} />
      </section>
    </main>
  )
}
