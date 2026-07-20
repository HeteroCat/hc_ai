import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { AboutJason } from "@/components/home/about-jason"
import { HomeIntro } from "@/components/home/home-intro"
import { SelectedNotes } from "@/components/home/selected-notes"
import { SelectedProjects } from "@/components/home/selected-projects"
import type { ContentItem } from "@/lib/site-content"

const linkedProject: ContentItem = {
  slug: "agent-workbench",
  title: "Agent Workbench",
  summary: "把任务拆解、工具调用与人工确认串成可靠的工作流。",
  category: "Agent",
  tags: ["Agent", "Workflow"],
  href: "https://example.com/agent-workbench",
  status: "live",
}

const linkedNote: ContentItem = {
  slug: "reliable-agent-workflows",
  title: "可靠 Agent 工作流的几个切面",
  summary: "从边界、反馈与恢复机制出发，记录实践中的判断。",
  category: "Agent 笔记",
  tags: ["Agent", "Notes"],
  href: "https://example.com/reliable-agent-workflows",
  status: "live",
}

describe("HomeIntro", () => {
  it("introduces Jason and his current areas of focus", () => {
    render(<HomeIntro />)

    expect(screen.getByRole("heading", { name: /你好，我是 Jason/ })).toBeInTheDocument()
    expect(screen.getByText(/Agent、AI 产品和生成式内容/)).toBeInTheDocument()
  })
})

describe("SelectedProjects", () => {
  it("renders secure external project links and the internal projects index", () => {
    const { rerender } = render(<SelectedProjects items={[linkedProject]} />)

    expect(screen.getByRole("link", { name: /Agent Workbench/ }))
      .toHaveAttribute("href", linkedProject.href)
    expect(screen.getByRole("link", { name: /Agent Workbench/ }))
      .toHaveAttribute("target", "_blank")
    expect(screen.getByRole("link", { name: /Agent Workbench/ }))
      .toHaveAttribute("rel", "noopener noreferrer")
    expect(screen.getByRole("link", { name: "查看全部项目" }))
      .toHaveAttribute("href", "/projects")

    rerender(<SelectedProjects items={[]} />)
    expect(screen.getByText("更多项目正在整理中")).toBeInTheDocument()
  })

  it("keeps projects without a destination readable and noninteractive", () => {
    render(<SelectedProjects items={[{ ...linkedProject, href: undefined }]} />)

    expect(screen.getByText(linkedProject.title)).toBeInTheDocument()
    expect(screen.queryByRole("link", { name: /Agent Workbench/ })).not.toBeInTheDocument()
  })
})

describe("SelectedNotes", () => {
  it("presents notes without recency claims and uses secure external links", () => {
    const { rerender } = render(<SelectedNotes items={[linkedNote]} />)

    expect(screen.getByRole("heading", { name: "文章与笔记" })).toBeInTheDocument()
    expect(screen.queryByText(/最新|最近写下/)).not.toBeInTheDocument()
    expect(screen.getByRole("link", { name: "查看全部文章" }))
      .toHaveAttribute("href", "/knowledge")
    expect(screen.getByRole("link", { name: /可靠 Agent 工作流的几个切面/ }))
      .toHaveAttribute("target", "_blank")
    expect(screen.getByRole("link", { name: /可靠 Agent 工作流的几个切面/ }))
      .toHaveAttribute("rel", "noopener noreferrer")

    rerender(<SelectedNotes items={[]} />)
    expect(screen.getByText("更多文章正在整理中")).toBeInTheDocument()
  })
})

describe("AboutJason", () => {
  it("uses Jason's portrait and points readers to a meaningful about page", () => {
    render(<AboutJason />)

    expect(screen.getByRole("img", { name: "Jason Huang" }))
      .toHaveAttribute("src", "/jason-hd.png")
    expect(screen.queryByText(/荣誉|最佳|获奖/)).not.toBeInTheDocument()
    expect(screen.getByRole("link", { name: /了解更多关于 Jason/ }))
      .toHaveAttribute("href", "/about")
  })
})
