import type { Metadata } from "next"
import { CheckIcon } from "lucide-react"

import { trainingItems } from "@/lib/site-content"
import { PageHero } from "@/components/page-hero"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "培训课程",
  description: "Jason AI 的公开课、Agent 应用开发体系课与企业内训规划。",
}

const outcomes = {
  "公开课": ["建立 AI 应用全景认知", "完成一个小型实战", "找到下一步学习路径"],
  "体系课": ["理解 Agent 与 RAG 原理", "掌握完整开发工作流", "完成可展示的综合项目"],
  "企业内训": ["统一团队 AI 认知", "结合岗位完成场景演练", "形成可继续实践的方法"],
}

export default function TrainingPage() {
  return (
    <main>
      <PageHero eyebrow="培训课程" title="围绕实战组织学习，而不是堆叠知识点" description="课程体系正在筹备。当前先公开方向、适合人群与预期收获，正式开放后接入飞书课程文档。" />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {trainingItems.map((item) => (
            <Card key={item.slug}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <Badge variant="outline">{item.category}</Badge>
                  <Badge variant="secondary">即将上线</Badge>
                </div>
                <CardTitle className="text-2xl">{item.title}</CardTitle>
                <CardDescription className="leading-6">{item.summary}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {outcomes[item.category as keyof typeof outcomes].map((outcome) => (
                  <div key={outcome} className="flex items-start gap-2 text-sm">
                    <CheckIcon className="mt-0.5 size-4 text-primary" aria-hidden="true" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" disabled>课程文档即将开放</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
