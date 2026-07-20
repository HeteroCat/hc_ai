import { describe, expect, it } from "vitest"

import { getSelectedNotes, getSelectedProjects } from "@/lib/home-content"
import { articleItems, projectItems } from "@/lib/site-content"

describe("homepage content selection", () => {
  it("takes the first three featured projects in source order", () => {
    expect(getSelectedProjects(projectItems).map((item) => item.slug)).toEqual([
      "hello-agents",
      "hugging-llm",
      "async-trader",
    ])
  })

  it("takes the first three linked articles in their curated source order", () => {
    expect(getSelectedNotes(articleItems).map((item) => item.slug)).toEqual([
      "agent-foundations",
      "prompt-skills",
      "chatgpt-overview",
    ])
  })

  it("returns all available eligible items when fewer than three exist", () => {
    expect(getSelectedProjects(projectItems.slice(0, 1))).toHaveLength(1)
    expect(getSelectedNotes(articleItems.slice(0, 1))).toHaveLength(1)
  })
})
