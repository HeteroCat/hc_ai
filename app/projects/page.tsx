import type { Metadata } from "next"

import { projectItems } from "@/lib/site-content"
import { ContentCard } from "@/components/content-card"
import { PageHero } from "@/components/page-hero"

export const metadata: Metadata = {
  title: "实战项目",
  description: "Jason AI 的开源项目、AI 产品与智能体实践。",
}

export default function ProjectsPage() {
  return (
    <main>
      <PageHero eyebrow="实战项目" title="真实作品，比概念更有说服力" description="这里收录开源教程、AI 产品和智能体应用。每个项目都指向真实可访问的成果。" />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectItems.map((item) => <ContentCard key={item.slug} item={item} />)}
        </div>
      </section>
    </main>
  )
}
