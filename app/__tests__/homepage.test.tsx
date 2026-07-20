import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import Home from "@/app/page"
import { socialLinks } from "@/lib/site-content"

describe("Home", () => {
  it("composes Jason's personal garden from real selected content", () => {
    const { container } = render(<Home />)
    const main = container.querySelector("main")

    expect(main).not.toBeNull()
    expect(Array.from(main?.children ?? []).map((section) => section.id)).toEqual([
      "intro",
      "projects",
      "notes",
      "about",
      "contact",
    ])

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("你好，我是 Jason")
    expect(container.querySelector("#projects")).toBeInTheDocument()
    expect(container.querySelector("#notes")).toBeInTheDocument()
    expect(screen.getByRole("img", { name: "Jason Huang" })).toBeInTheDocument()
    expect(container.querySelector("#contact")).toBeInTheDocument()

    for (const oldCopy of [
      "企业服务",
      "培训体系",
      "能力地图",
      "用作品证明能力",
      "提交企业需求",
      "开始学习",
      "查看企业服务",
      "个人学习与企业服务双入口",
      "想系统学习",
    ]) {
      expect(screen.queryByText(new RegExp(oldCopy))).not.toBeInTheDocument()
    }

    expect(within(container.querySelector("#projects")!).getByText("Hello-Agents")).toBeInTheDocument()
    expect(within(container.querySelector("#notes")!).getByText("AI Agent 从原理到实践")).toBeInTheDocument()

    const expectedHref = socialLinks.find((item) => item.title === "小红书")?.href
    const xiaohongshuLink = within(container.querySelector("#contact")!).getByRole("link", {
      name: "在小红书认识 Jason",
    })
    expect(xiaohongshuLink).toHaveAttribute("href", expectedHref)
    expect(xiaohongshuLink).toHaveAttribute("target", "_blank")
    expect(xiaohongshuLink).toHaveAttribute("rel", "noopener noreferrer")
  })
})
