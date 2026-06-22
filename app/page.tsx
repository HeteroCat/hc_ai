import Image from "next/image"
import Link from "next/link"
import {
  ArrowRightIcon,
  BookOpenIcon,
  BotIcon,
  BriefcaseBusinessIcon,
  GraduationCapIcon,
  SparklesIcon,
} from "lucide-react"

import {
  articleItems,
  caseItems,
  honors,
  knowledgeItems,
  projectItems,
  serviceItems,
  siteConfig,
  trainingItems,
} from "@/lib/site-content"
import { ContentCard } from "@/components/content-card"
import { FeishuCta } from "@/components/feishu-cta"
import { SectionHeading } from "@/components/section-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const topicIcons = [BotIcon, BookOpenIcon, SparklesIcon, BriefcaseBusinessIcon]

export default function Home() {
  const featuredTopics = knowledgeItems.filter((item) => item.featured).slice(0, 4)

  return (
    <main>
      <section className="relative overflow-hidden border-b">
        <div className="hero-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8">
          <div className="flex flex-col gap-7">
            <Badge variant="secondary" className="w-fit">
              AI 学习 · 实战 · 企业落地
            </Badge>
            <div className="flex flex-col gap-5">
              <h1 className="text-5xl font-semibold tracking-[-0.04em] text-balance md:text-7xl">
                把 AI 学明白，<span className="text-primary">也把它做出来。</span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">{siteConfig.description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/knowledge">
                  开始学习
                  <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/enterprise">查看企业服务</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">个人学习与企业服务双入口 · 核心内容通过飞书持续更新</p>
          </div>

          <Card className="relative overflow-hidden bg-card/80">
            <CardHeader>
              <Badge variant="outline" className="w-fit">能力地图</Badge>
              <CardTitle className="text-2xl">从认知到落地的四个层级</CardTitle>
              <CardDescription>每一层都有真实内容或项目作为支撑。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {[
                ["01", "理解", "掌握模型、Agent 与 RAG 的核心逻辑"],
                ["02", "实践", "跟随项目把概念变成可运行应用"],
                ["03", "交付", "围绕真实任务设计可靠工作流"],
                ["04", "增长", "让 AI 成为个人与组织的长期能力"],
              ].map(([number, title, description]) => (
                <div key={number} className="grid grid-cols-[auto_1fr] gap-4 rounded-lg border bg-background/50 p-4">
                  <span className="font-mono text-sm text-primary">{number}</span>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="热门专题" title="沿着清晰路径进入 AI 世界" description="先建立认知，再完成项目，最后把方法应用到真实工作。" />
          <Button variant="outline" asChild>
            <Link href="/knowledge">浏览全部知识</Link>
          </Button>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {featuredTopics.map((item, index) => {
            const Icon = topicIcons[index]
            return (
              <Card key={item.slug}>
                <CardHeader>
                  <Icon className="size-7 text-primary" aria-hidden="true" />
                  <CardTitle>{item.category}</CardTitle>
                  <CardDescription className="leading-6">{item.summary}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="border-y bg-card/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="实战项目" title="用作品证明能力" description="开源教程、AI 产品和智能体应用，全部来自真实实践。" />
            <Button variant="outline" asChild>
              <Link href="/projects">查看全部项目</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projectItems.filter((item) => item.featured).map((item) => (
              <ContentCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col gap-8">
          <SectionHeading eyebrow="培训体系" title="从一次体验，到独立完成项目" description="课程正在筹备，先公开学习框架与方向，不制造虚构成果。" />
          <div className="flex flex-col gap-3">
            {trainingItems.map((item) => (
              <div key={item.slug} className="flex items-start gap-4 rounded-xl border bg-card p-5">
                <GraduationCapIcon className="mt-1 size-5 text-primary" aria-hidden="true" />
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{item.title}</p>
                    <Badge variant="secondary">即将上线</Badge>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">{item.summary}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" asChild className="w-fit">
            <Link href="/training">查看培训规划</Link>
          </Button>
        </div>
        <div className="flex flex-col gap-8">
          <SectionHeading eyebrow="企业服务" title="从业务问题出发，而不是从模型出发" description="围绕场景、流程与交付设计 AI 方案，所有服务均处于开放筹备阶段。" />
          <div className="grid gap-3 sm:grid-cols-2">
            {serviceItems.map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="leading-6">{item.summary}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <Button variant="outline" asChild className="w-fit">
            <Link href="/enterprise">了解合作方式</Link>
          </Button>
        </div>
      </section>

      <section className="border-y bg-card/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="能力案例" title="不虚构客户，只展示做过的事" description="用真实项目说明知识组织、产品构建与流程自动化能力。" />
            <Button variant="outline" asChild>
              <Link href="/cases">查看案例</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {caseItems.map((item) => (
              <ContentCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
        <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl border">
          <Image src="/Jason-img.jpeg" alt="Jason Huang" fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-7">
          <SectionHeading eyebrow="关于 Jason" title="持续学习，也持续把想法做成产品" description="AI 工程师、内容创作者与开源贡献者，关注 Agent、AI 产品和生成式内容。" />
          <div className="flex flex-wrap gap-2">
            {honors.slice(0, 5).map((item) => (
              <Badge key={item} variant="secondary">{item}</Badge>
            ))}
          </div>
          <Button variant="outline" asChild className="w-fit">
            <Link href="/about">了解更多经历</Link>
          </Button>
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="最新内容" title="持续更新的 AI 学习笔记" description="站内阅读简介，核心文章与文档在外部平台持续维护。" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articleItems.slice(0, 3).map((item) => (
              <ContentCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-16 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div className="flex max-w-2xl flex-col gap-3">
            <p className="text-sm font-medium opacity-70">下一步</p>
            <h2 className="text-3xl font-semibold tracking-tight">想系统学习，还是一起解决业务问题？</h2>
            <p className="opacity-70">先从知识库开始，也可以查看企业服务的合作方式。</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/knowledge">进入知识库</Link>
            </Button>
            <FeishuCta variant="secondary" />
          </div>
        </div>
      </section>
    </main>
  )
}
