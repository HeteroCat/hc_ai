import type { Metadata } from "next"
import { CheckIcon } from "lucide-react"

import { serviceItems } from "@/lib/site-content"
import { FeishuCta } from "@/components/feishu-cta"
import { PageHero } from "@/components/page-hero"
import { SectionHeading } from "@/components/section-heading"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "企业服务",
  description: "AI 业务咨询、Agent 定制开发、工作流自动化与企业 AI 内训。",
}

export default function EnterprisePage() {
  return (
    <main>
      <PageHero eyebrow="企业服务" title="让 AI 对应具体任务、流程与交付" description="不从追逐模型开始，而是先确认业务问题、使用者和成功标准，再选择合适的技术路径。" />
      <section className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading title="可以一起解决的问题" description="以下服务处于开放筹备阶段，可通过飞书表单提交业务背景与需求。" />
        <div className="grid gap-6 md:grid-cols-2">
          {serviceItems.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <Badge variant="outline">{item.audience}</Badge>
                  <Badge variant="secondary">筹备中</Badge>
                </div>
                <CardTitle className="text-2xl">{item.title}</CardTitle>
                <CardDescription className="leading-6">{item.summary}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {item.deliverables.map((deliverable) => (
                  <Badge key={deliverable} variant="secondary">{deliverable}</Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="border-y bg-card/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading title="合作流程" description="先用轻量沟通确定问题，再决定是否进入方案与交付。" />
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["01", "需求收集", "通过飞书表单了解背景、目标与现状。"],
              ["02", "场景澄清", "确认关键使用者、约束和成功标准。"],
              ["03", "方案建议", "给出路径、范围与阶段性交付建议。"],
              ["04", "项目推进", "按确认的边界进行开发、培训或咨询。"],
            ].map(([number, title, description]) => (
              <Card key={number}>
                <CardHeader>
                  <span className="font-mono text-sm text-primary">{number}</span>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription className="leading-6">{description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="flex items-center gap-3 rounded-xl border bg-card p-5">
            <CheckIcon className="size-5 text-primary" aria-hidden="true" />
            <p className="flex-1 text-sm text-muted-foreground">表单链接配置后，这里会直接进入飞书需求收集页面。</p>
            <FeishuCta />
          </div>
        </div>
      </section>
    </main>
  )
}
