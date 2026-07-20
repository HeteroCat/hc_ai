import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { metadata } from "@/app/layout"
import { SiteHeader } from "@/components/site-header"
import { navItems, siteConfig } from "@/lib/site-content"

describe("personal site identity", () => {
  it("uses Jason Huang as the site name", () => {
    expect(siteConfig.name).toBe("Jason Huang")
  })

  it("uses the personal-site navigation", () => {
    expect(navItems).toEqual([
      { title: "项目", href: "/#projects" },
      { title: "文章", href: "/#notes" },
      { title: "关于", href: "/about" },
      { title: "联系", href: "/#contact" },
    ])
  })

  it("renders the personal brand without commercial calls to action", () => {
    render(<SiteHeader />)

    expect(screen.getByRole("link", { name: "Jason Huang" })).toHaveAttribute("href", "/")
    expect(screen.queryByText("企业咨询")).not.toBeInTheDocument()
    expect(screen.queryByText("咨询即将开放")).not.toBeInTheDocument()
    expect(screen.queryByText("企业服务")).not.toBeInTheDocument()
  })

  it("uses personal-site metadata", () => {
    expect(metadata.title).toMatchObject({
      default: "Jason Huang｜AI Builder & Creator",
    })
    expect(String(metadata.description)).not.toMatch(/企业|培训|落地平台/)
  })
})
