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
  it("renders the approved personal introduction contract", () => {
    const { container } = render(<HomeIntro />)

    expect(container.firstElementChild).toMatchObject({ tagName: "SECTION", id: "intro" })
    expect(screen.getByText("AI BUILDER · CREATOR · OPEN-SOURCE CONTRIBUTOR")).toBeInTheDocument()
    expect(screen.getByRole("heading", {
      level: 1,
      name: "你好，我是 Jason。我做 AI 产品，也记录一路上的想法。",
    })).toBeInTheDocument()
    expect(screen.getByText(/Agent、AI 产品和生成式内容/)).toBeInTheDocument()
    expect(screen.getByText("NOW / 2026")).toBeInTheDocument()
    expect(screen.queryByText(/企业|能力地图|capability/i)).not.toBeInTheDocument()
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
    expect(container.querySelector("[data-slot='badge']")).not.toBeInTheDocument()
  })
})

describe("SelectedProjects", () => {
  it("renders secure external project links and the internal projects index", () => {
    const { container, rerender } = render(<SelectedProjects items={[linkedProject]} />)

    expect(container.firstElementChild).toMatchObject({ tagName: "SECTION", id: "projects" })
    const firstRow = screen.getByRole("listitem")
    expect(firstRow).toHaveTextContent("01")
    expect(firstRow).toHaveTextContent(linkedProject.title)
    expect(firstRow).toHaveTextContent(linkedProject.category)
    expect(firstRow).toHaveTextContent(linkedProject.summary)
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
    const { container, rerender } = render(<SelectedNotes items={[linkedNote]} />)

    expect(container.firstElementChild).toMatchObject({ tagName: "SECTION", id: "notes" })
    expect(screen.getByRole("heading", { name: "文章与笔记" })).toBeInTheDocument()
    expect(screen.queryByText(/最新|最近写下/)).not.toBeInTheDocument()
    expect(screen.getByRole("link", { name: "查看全部文章" }))
      .toHaveAttribute("href", "/knowledge")
    expect(screen.getByRole("link", { name: /可靠 Agent 工作流的几个切面/ }))
      .toHaveAttribute("target", "_blank")
    expect(screen.getByRole("link", { name: /可靠 Agent 工作流的几个切面/ }))
      .toHaveAttribute("rel", "noopener noreferrer")
    const firstRow = screen.getByRole("listitem")
    expect(firstRow).toHaveTextContent(linkedNote.title)
    expect(firstRow).toHaveTextContent(linkedNote.category)
    expect(firstRow).toHaveTextContent(linkedNote.summary)

    rerender(<SelectedNotes items={[]} />)
    expect(screen.getByText("更多文章正在整理中")).toBeInTheDocument()
  })
})

describe("AboutJason", () => {
  it("uses Jason's portrait and points readers to a meaningful about page", () => {
    const { container } = render(<AboutJason />)

    expect(container.firstElementChild).toMatchObject({ tagName: "SECTION", id: "about" })
    expect(screen.getByRole("heading", {
      name: "持续学习，也持续把想法做成产品。",
    })).toBeInTheDocument()
    expect(screen.getByText(/AI 如何进入真实工作与创作/)).toBeInTheDocument()
    const portrait = screen.getByRole("img", { name: "Jason Huang" })
    expect(portrait).toHaveAttribute("src", "/jason-hd.png")
    expect(portrait).toHaveClass("object-contain")
    expect(portrait.parentElement).toHaveClass("aspect-square")
    expect(screen.queryByText(/荣誉|最佳|获奖|企业|商业|badge/i)).not.toBeInTheDocument()
    expect(container.querySelector("[data-slot='badge']")).not.toBeInTheDocument()
    expect(screen.getByRole("link", { name: /了解更多关于 Jason/ }))
      .toHaveAttribute("href", "/about")
  })
})
