import type { Metadata } from "next"

import { caseItems } from "@/lib/site-content"
import { ContentCard } from "@/components/content-card"
import { PageHero } from "@/components/page-hero"

export const metadata: Metadata = {
  title: "成功案例",
  description: "Jason AI 的知识产品、应用创新与流程自动化能力案例。",
}

export default function CasesPage() {
  return (
    <main>
      <PageHero eyebrow="能力案例" title="只展示真实做过的事" description="当前以公开项目作为能力案例，不使用未经验证的客户评价、收益数据或效果承诺。" />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseItems.map((item) => <ContentCard key={item.slug} item={item} />)}
        </div>
      </section>
    </main>
  )
}
