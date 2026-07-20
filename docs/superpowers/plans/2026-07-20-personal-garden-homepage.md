# Jason Personal Garden Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage as a dark editorial personal garden that introduces Jason, highlights selected work and writing, and invites contact through Xiaohongshu or an on-demand WeChat QR code without commercial platform messaging.

**Architecture:** Keep `app/page.tsx` as a server-rendered composition root and split each homepage section into a focused component under `components/home/`. Continue sourcing projects, articles, and social links from `lib/site-content.ts`; add a small selector module for curated homepage content. Keep the existing `SplashCursor`, adding only coarse-pointer and reduced-motion guards, and isolate the WeChat disclosure as the only client-side homepage interaction.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Radix UI primitives, Vitest, Testing Library, ESLint.

---

## File Map

**Create**

- `vitest.config.ts` — Vitest aliases and jsdom environment.
- `vitest.setup.tsx` — DOM matchers and stable mocks for Next image/navigation and browser APIs.
- `lib/home-content.ts` — deterministic selectors for homepage projects and notes.
- `lib/__tests__/home-content.test.ts` — selector behavior.
- `components/home/home-intro.tsx` — first-person hero and current-focus note.
- `components/home/selected-projects.tsx` — editorial project rows and empty state.
- `components/home/selected-notes.tsx` — curated article rows and empty state.
- `components/home/about-jason.tsx` — portrait and short personal summary.
- `components/home/say-hello.tsx` — Xiaohongshu link and triggered WeChat QR sheet/popover.
- `components/home/__tests__/homepage-sections.test.tsx` — server section rendering and empty states.
- `components/home/__tests__/say-hello.test.tsx` — WeChat disclosure accessibility and fallback behavior.
- `app/__tests__/homepage.test.tsx` — homepage structure and removal of commercial copy.
- `components/__tests__/site-header.test.tsx` — simplified global navigation.
- `components/__tests__/splash-cursor.test.tsx` — reduced-motion and coarse-pointer guards.
- `public/wechat-qr.jpg` — exact copy of the user-provided QR asset.

**Add existing user asset to version control**

- `public/jason-hd.png` — existing user-provided portrait, added without modification.

**Modify**

- `package.json` and `package-lock.json` — add test dependencies and `test` scripts.
- `.gitignore` — ignore `.superpowers/` visual brainstorming artifacts.
- `lib/site-content.ts` — personal-site config and explicit global navigation targets.
- `components/site-header.tsx` — remove product avatar, commercial CTA, and commercial mobile description.
- `app/layout.tsx` — personal-site metadata while retaining the black theme and `SplashCursor`.
- `app/page.tsx` — replace the commercial landing page with five focused homepage sections.
- `components/SplashCursor.tsx` — skip WebGL initialization for reduced motion and coarse pointers.
- `app/globals.css` — dark editorial section/row utilities only where Tailwind classes would become repetitive.

**Do not modify**

- `public/Jason-img.jpeg` — it already contains unrelated user changes.
- Training, enterprise, cases, projects, knowledge, or about page implementations beyond navigation/metadata effects.

## Task 1: Add the Test Harness and Ignore Brainstorm Artifacts

**Files:**

- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.ts`
- Create: `vitest.setup.tsx`
- Modify: `.gitignore`

- [ ] **Step 1: Install the test-only dependencies**

Run:

```bash
npm install --save-dev vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Expected: exit 0; `package.json` and `package-lock.json` list the new dev dependencies.

- [ ] **Step 2: Add deterministic test scripts**

Add to `package.json`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Configure Vitest and the browser-like test environment**

Create `vitest.config.ts`:

```ts
import path from "node:path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(process.cwd()),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.tsx"],
  },
})
```

Create `vitest.setup.tsx` with:

```tsx
import "@testing-library/jest-dom/vitest"
import { vi } from "vitest"

vi.mock("next/image", () => ({
  default: ({ fill: _fill, priority: _priority, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} />
  ),
}))

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}))

vi.mock("next/font/local", () => ({
  default: () => ({
    className: "",
    variable: "",
  }),
}))

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

vi.stubGlobal("ResizeObserver", ResizeObserverMock)
vi.stubGlobal("PointerEvent", MouseEvent)

HTMLElement.prototype.scrollIntoView = vi.fn()
HTMLElement.prototype.hasPointerCapture = vi.fn(() => false)
HTMLElement.prototype.setPointerCapture = vi.fn()
HTMLElement.prototype.releasePointerCapture = vi.fn()
```

- [ ] **Step 4: Ignore persistent visual-companion output**

Append to `.gitignore`:

```gitignore
.superpowers/
```

- [ ] **Step 5: Verify the empty test suite and lint configuration load**

Run:

```bash
npm test -- --passWithNoTests
npm run lint
```

Expected: tests exit 0 with no tests; lint has no new errors. Existing `SplashCursor.tsx` compiler warnings may still be present at this point.

- [ ] **Step 6: Commit the harness**

```bash
git add package.json package-lock.json vitest.config.ts vitest.setup.tsx .gitignore
git commit -m "test: add homepage component test harness"
```

## Task 2: Define Personal-Site Config, Navigation, and Metadata

**Files:**

- Modify: `lib/site-content.ts`
- Modify: `components/site-header.tsx`
- Modify: `app/layout.tsx`
- Create: `components/__tests__/site-header.test.tsx`

- [ ] **Step 1: Write failing shell tests**

Create `components/__tests__/site-header.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { metadata } from "@/app/layout"
import { SiteHeader } from "@/components/site-header"
import { navItems, siteConfig } from "@/lib/site-content"

describe("personal site shell", () => {
  it("uses the personal identity and explicit homepage navigation targets", () => {
    expect(siteConfig.name).toBe("Jason Huang")
    expect(navItems).toEqual([
      { title: "项目", href: "/#projects" },
      { title: "文章", href: "/#notes" },
      { title: "关于", href: "/about" },
      { title: "联系", href: "/#contact" },
    ])
  })

  it("renders no enterprise-consulting action", () => {
    render(<SiteHeader />)
    expect(screen.getByRole("link", { name: "Jason Huang" })).toHaveAttribute("href", "/")
    expect(screen.queryByText(/企业咨询|咨询即将开放|企业服务/)).not.toBeInTheDocument()
  })

  it("uses personal-site metadata", () => {
    const title = metadata.title as { default: string }
    expect(title.default).toBe("Jason Huang｜AI Builder & Creator")
    expect(String(metadata.description)).not.toMatch(/企业|培训|落地平台/)
  })
})
```

- [ ] **Step 2: Run the shell tests and verify RED**

Run:

```bash
npm test -- components/__tests__/site-header.test.tsx
```

Expected: FAIL because the current config, header CTA, navigation, and metadata are commercial.

- [ ] **Step 3: Implement the minimal config and metadata changes**

In `lib/site-content.ts`, set:

```ts
export const siteConfig = {
  name: "Jason Huang",
  tagline: "AI Builder、内容创作者与开源贡献者",
  description: "Jason Huang 的个人主页，记录 AI 项目、文章、开源共创与持续生长的想法。",
  feishuFormUrl: "",
}

export const navItems = [
  { title: "项目", href: "/#projects" },
  { title: "文章", href: "/#notes" },
  { title: "关于", href: "/about" },
  { title: "联系", href: "/#contact" },
]
```

In `app/layout.tsx`, set personal metadata while preserving `<html className="dark">`, `<SplashCursor />`, and `<SiteHeader />`:

```ts
export const metadata: Metadata = {
  title: {
    default: "Jason Huang｜AI Builder & Creator",
    template: "%s｜Jason Huang",
  },
  description: "Jason Huang 的个人主页，记录 AI 项目、文章、开源共创与持续生长的想法。",
  openGraph: {
    title: "Jason Huang",
    description: "AI 项目、文章与持续生长的想法。",
    type: "website",
    locale: "zh_CN",
  },
}
```

Refactor `components/site-header.tsx` so the brand is a text link named `Jason Huang`, desktop and mobile use the four `navItems`, and no avatar, tagline, Feishu form, or consultation button remains.

- [ ] **Step 4: Run the shell tests and verify GREEN**

Run:

```bash
npm test -- components/__tests__/site-header.test.tsx
```

Expected: 3 tests PASS.

- [ ] **Step 5: Commit the personal shell**

```bash
git add lib/site-content.ts components/site-header.tsx app/layout.tsx components/__tests__/site-header.test.tsx
git commit -m "feat: reposition site around Jason's personal work"
```

## Task 3: Add Deterministic Homepage Content Selectors

**Files:**

- Create: `lib/home-content.ts`
- Create: `lib/__tests__/home-content.test.ts`

- [ ] **Step 1: Write the failing selector tests**

Create `lib/__tests__/home-content.test.ts`:

```ts
import { describe, expect, it } from "vitest"

import { articleItems, projectItems } from "@/lib/site-content"
import { getSelectedNotes, getSelectedProjects } from "@/lib/home-content"

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
      "prompt-skills",
      "chatgpt-overview",
      "ai-year-2023",
    ])
  })

  it("returns all available eligible items when fewer than three exist", () => {
    expect(getSelectedProjects(projectItems.slice(0, 1))).toHaveLength(1)
    expect(getSelectedNotes(articleItems.slice(0, 1))).toHaveLength(1)
  })
})
```

- [ ] **Step 2: Run the selector tests and verify RED**

Run:

```bash
npm test -- lib/__tests__/home-content.test.ts
```

Expected: FAIL because `lib/home-content.ts` does not exist.

- [ ] **Step 3: Implement the selectors**

Create `lib/home-content.ts`:

```ts
import type { ContentItem } from "@/lib/site-content"

export function getSelectedProjects(items: ContentItem[]) {
  return items.filter((item) => item.featured).slice(0, 3)
}

export function getSelectedNotes(items: ContentItem[]) {
  return items.filter((item) => item.href).slice(0, 3)
}
```

- [ ] **Step 4: Run the selector tests and verify GREEN**

Run:

```bash
npm test -- lib/__tests__/home-content.test.ts
```

Expected: 3 tests PASS.

- [ ] **Step 5: Commit the selectors**

```bash
git add lib/home-content.ts lib/__tests__/home-content.test.ts
git commit -m "feat: select curated homepage content"
```

## Task 4: Build the Server-Rendered Editorial Sections

**Files:**

- Create: `components/home/home-intro.tsx`
- Create: `components/home/selected-projects.tsx`
- Create: `components/home/selected-notes.tsx`
- Create: `components/home/about-jason.tsx`
- Create: `components/home/__tests__/homepage-sections.test.tsx`
- Add existing asset: `public/jason-hd.png`

- [ ] **Step 1: Write failing section tests**

Create `components/home/__tests__/homepage-sections.test.tsx` with real `ContentItem` fixtures and assertions for:

```tsx
it("introduces Jason in the first person", () => {
  render(<HomeIntro />)
  expect(screen.getByRole("heading", { name: /你好，我是 Jason/ })).toBeInTheDocument()
  expect(screen.getByText(/Agent、AI 产品和生成式内容/)).toBeInTheDocument()
})

it("renders project rows and a useful empty state", () => {
  const { rerender } = render(<SelectedProjects items={[projectFixture]} />)
  expect(screen.getByRole("link", { name: /Hello-Agents/ })).toHaveAttribute("target", "_blank")
  expect(screen.getByRole("link", { name: /Hello-Agents/ })).toHaveAttribute("rel", "noopener noreferrer")
  expect(screen.getByRole("link", { name: "查看全部项目" })).toHaveAttribute("href", "/projects")
  rerender(<SelectedProjects items={[]} />)
  expect(screen.getByText("更多项目正在整理中")).toBeInTheDocument()
})

it("does not fabricate a link for a project without href", () => {
  render(<SelectedProjects items={[{ ...projectFixture, href: undefined }]} />)
  expect(screen.getByText(projectFixture.title)).toBeInTheDocument()
  expect(screen.queryByRole("link", { name: new RegExp(projectFixture.title) })).not.toBeInTheDocument()
})

it("renders notes without claiming chronological order", () => {
  render(<SelectedNotes items={[noteFixture]} />)
  expect(screen.getByRole("heading", { name: "文章与笔记" })).toBeInTheDocument()
  expect(screen.queryByText(/最新|最近写下/)).not.toBeInTheDocument()
  expect(screen.getByRole("link", { name: "查看全部文章" })).toHaveAttribute("href", "/knowledge")
})

it("uses the approved portrait and personal summary", () => {
  render(<AboutJason />)
  expect(screen.getByRole("img", { name: "Jason Huang" })).toHaveAttribute("src", "/jason-hd.png")
  expect(screen.queryByText(/荣誉|最佳创意奖/)).not.toBeInTheDocument()
})
```

- [ ] **Step 2: Run the section tests and verify RED**

Run:

```bash
npm test -- components/home/__tests__/homepage-sections.test.tsx
```

Expected: FAIL because the four components do not exist.

- [ ] **Step 3: Implement `HomeIntro`**

Render a full-width editorial hero as a root `<section id="intro">` with:

- Eyebrow: `AI BUILDER · CREATOR · OPEN-SOURCE CONTRIBUTOR`
- Heading: `你好，我是 Jason。我做 AI 产品，也记录一路上的想法。`
- Supporting copy from the approved spec.
- A compact `NOW / 2026` aside about reliable Agent workflows and improving this site.
- No buttons, badges, capability map, or enterprise copy.

- [ ] **Step 4: Implement `SelectedProjects`**

Accept `items: ContentItem[]`, render a root `<section id="projects">`, heading `最近做的项目`, a `查看全部项目` link to `/projects`, and editorial rows containing index, title, category, and summary. Only wrap a row in an external link when `item.href` exists; use `target="_blank" rel="noopener noreferrer"`. When `href` is missing, render readable non-interactive text and no fabricated disabled link. When empty, render `更多项目正在整理中`.

- [ ] **Step 5: Implement `SelectedNotes`**

Accept `items: ContentItem[]`, render a root `<section id="notes">`, heading `文章与笔记`, a `查看全部文章` link to `/knowledge`, and rows containing title, category, short summary, and secure external link. When empty, render `更多文章正在整理中`.

- [ ] **Step 6: Implement `AboutJason`**

Render a root `<section id="about">` containing `/jason-hd.png` with `next/image`, a short first-person-adjacent summary, and a text link to `/about`. Do not render the `honors` array or badge cloud. Treat the existing untracked `public/jason-hd.png` as an approved user asset: do not alter its bytes, crop it, or replace it.

- [ ] **Step 7: Run the section tests and verify GREEN**

Run:

```bash
npm test -- components/home/__tests__/homepage-sections.test.tsx
```

Expected: all section tests PASS.

- [ ] **Step 8: Commit the server sections**

```bash
git add components/home/home-intro.tsx components/home/selected-projects.tsx components/home/selected-notes.tsx components/home/about-jason.tsx components/home/__tests__/homepage-sections.test.tsx public/jason-hd.png
git commit -m "feat: add dark editorial homepage sections"
```

## Task 5: Add the Triggered Xiaohongshu and WeChat Contact Section

**Files:**

- Create: `components/home/say-hello.tsx`
- Create: `components/home/__tests__/say-hello.test.tsx`
- Create: `public/wechat-qr.jpg`

- [ ] **Step 1: Write failing contact tests**

Create `components/home/__tests__/say-hello.test.tsx` and use `userEvent.setup()` to verify:

```tsx
it("keeps the QR hidden until the WeChat trigger is activated", async () => {
  const user = userEvent.setup()
  render(<SayHello xiaohongshuHref="https://example.com/xhs" />)
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  await user.click(screen.getByRole("button", { name: "微信" }))
  expect(screen.getByRole("dialog", { name: "微信联系" })).toBeInTheDocument()
  expect(screen.getByRole("img", { name: "Jason 的微信二维码" })).toHaveAttribute("src", "/wechat-qr.jpg")
  expect(screen.getByRole("button", { name: "微信" })).toHaveAttribute("aria-expanded", "true")
  expect(screen.getByRole("button", { name: "微信" })).toHaveAttribute("aria-controls")
})

it("closes with Escape and returns focus to the trigger", async () => {
  const user = userEvent.setup()
  render(<SayHello xiaohongshuHref="https://example.com/xhs" />)
  const trigger = screen.getByRole("button", { name: "微信" })
  await user.click(trigger)
  await user.keyboard("{Escape}")
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  expect(trigger).toHaveFocus()
})

it("falls back to Xiaohongshu if the QR image fails", async () => {
  const user = userEvent.setup()
  render(<SayHello xiaohongshuHref="https://example.com/xhs" />)
  await user.click(screen.getByRole("button", { name: "微信" }))
  fireEvent.error(screen.getByRole("img", { name: "Jason 的微信二维码" }))
  expect(screen.getByText(/二维码暂时无法加载/)).toBeInTheDocument()
  expect(screen.getByRole("link", { name: /小红书/ })).toHaveAttribute("href", "https://example.com/xhs")
})

it("dismisses when interacting outside the mobile sheet", async () => {
  const user = userEvent.setup()
  const { container } = render(<SayHello xiaohongshuHref="https://example.com/xhs" />)
  await user.click(screen.getByRole("button", { name: "微信" }))
  fireEvent.pointerDown(container.ownerDocument.querySelector('[data-slot="sheet-overlay"]')!)
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
})
```

Import `fireEvent` and `waitFor` from Testing Library. Also assert the Xiaohongshu link uses `target="_blank"` and `rel="noopener noreferrer"`. Add a desktop-mode test by mocking `matchMedia("(min-width: 640px)")` to match; verify the WeChat trigger opens an anchored Radix `Popover` and an outside pointer interaction dismisses it.

- [ ] **Step 2: Run the contact tests and verify RED**

Run:

```bash
npm test -- components/home/__tests__/say-hello.test.tsx
```

Expected: FAIL because `SayHello` does not exist.

- [ ] **Step 3: Copy the exact user-provided QR asset**

Run:

```bash
cp "/Users/jason/Downloads/微信图片_20260720170701_10_132.jpg" public/wechat-qr.jpg
```

Expected: `file public/wechat-qr.jpg` reports a readable JPEG. Do not crop, filter, recompress, or edit it.

- [ ] **Step 4: Implement the accessible contact component**

Build `SayHello` as a client component with:

- Root section `id="contact"` and copy `如果你也在做有趣的东西，欢迎认识一下。`
- Xiaohongshu external link supplied through the `xiaohongshuHref` prop.
- A small `useMediaQuery("(min-width: 640px)")` hook based on `useSyncExternalStore`, using `false` as the server snapshot so server rendering is deterministic.
- On desktop, a Radix `Popover` imported from `radix-ui`, anchored to the `微信` trigger with `side="top"`, `align="end"`, collision padding, a compact width, and `aria-label="微信联系"` on its content. This is the approved lightweight near-trigger disclosure.
- On mobile, the existing Radix-backed `Sheet` with `SheetContent side="bottom"`, a clear close button, `SheetTitle` set to `微信联系`, and `SheetDescription` explaining that the QR adds Jason as a friend.
- Both variants expose Radix-managed `aria-expanded`/`aria-controls`, Escape dismissal, outside dismissal, and focus return.
- `/wechat-qr.jpg` rendered with a plain `<img>` (with a narrow ESLint suppression), complete with `object-contain`, no filter, no crop, and no Next Image optimization or recompression.
- Local image-error state that replaces the broken image with the Xiaohongshu fallback.

Do not display the nickname `JasonHuang` as a separate searchable identifier.

- [ ] **Step 5: Run the contact tests and verify GREEN**

Run:

```bash
npm test -- components/home/__tests__/say-hello.test.tsx
```

Expected: all contact tests PASS.

- [ ] **Step 6: Commit the contact flow and asset**

```bash
git add components/home/say-hello.tsx components/home/__tests__/say-hello.test.tsx public/wechat-qr.jpg
git commit -m "feat: add personal contact invitations"
```

## Task 6: Compose the New Homepage and Remove Commercial Sections

**Files:**

- Modify: `app/page.tsx`
- Create: `app/__tests__/homepage.test.tsx`

- [ ] **Step 1: Write the failing homepage composition test**

Create `app/__tests__/homepage.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import Home from "@/app/page"

describe("homepage", () => {
  it("renders the personal-garden sections in order", () => {
    const { container } = render(<Home />)
    expect(screen.getByRole("heading", { name: /你好，我是 Jason/ })).toBeInTheDocument()
    expect(container.querySelector("#projects")).toBeInTheDocument()
    expect(container.querySelector("#notes")).toBeInTheDocument()
    expect(screen.getByRole("img", { name: "Jason Huang" })).toBeInTheDocument()
    expect(container.querySelector("#contact")).toBeInTheDocument()
    const sectionIds = [...container.querySelectorAll("main > section")].map((section) => section.id)
    expect(sectionIds).toEqual(["intro", "projects", "notes", "about", "contact"])
  })

  it("does not render the old commercial landing-page language", () => {
    render(<Home />)
    expect(screen.queryByText(/企业服务|培训体系|能力地图|用作品证明能力|提交企业需求/)).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the homepage test and verify RED**

Run:

```bash
npm test -- app/__tests__/homepage.test.tsx
```

Expected: FAIL because the current homepage still renders commercial sections.

- [ ] **Step 3: Replace `app/page.tsx` with the composition root**

The page should only:

1. Import `projectItems`, `articleItems`, and `socialLinks`.
2. Call `getSelectedProjects` and `getSelectedNotes`.
3. Resolve the Xiaohongshu URL by title, with a safe fallback to `/about` if missing.
4. Render `HomeIntro`, `SelectedProjects`, `SelectedNotes`, `AboutJason`, and `SayHello` in that order.

Remove imports and rendering for `serviceItems`, `trainingItems`, `caseItems`, `honors`, `FeishuCta`, capability cards, badge clouds, and the old CTA.

- [ ] **Step 4: Run the homepage and all component tests**

Run:

```bash
npm test -- app/__tests__/homepage.test.tsx components/home lib/__tests__/home-content.test.ts
```

Expected: all targeted tests PASS.

- [ ] **Step 5: Commit the homepage composition**

```bash
git add app/page.tsx app/__tests__/homepage.test.tsx
git commit -m "feat: rebuild homepage as a personal garden"
```

## Task 7: Guard the Splash Cursor for Reduced Motion and Touch Devices

**Files:**

- Modify: `components/SplashCursor.tsx`
- Create: `components/__tests__/splash-cursor.test.tsx`

- [ ] **Step 1: Write failing cursor guard tests**

In `components/__tests__/splash-cursor.test.tsx`, mock `window.matchMedia` per test and spy on `HTMLCanvasElement.prototype.getContext`:

```tsx
it.each([
  "(prefers-reduced-motion: reduce)",
  "(pointer: coarse)",
])("does not initialize WebGL when %s matches", (matchingQuery) => {
  window.matchMedia = vi.fn((query: string) => ({
    matches: query.includes(matchingQuery),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as typeof window.matchMedia

  const getContext = vi.spyOn(HTMLCanvasElement.prototype, "getContext")
  render(<SplashCursor />)
  expect(getContext).not.toHaveBeenCalled()
})
```

- [ ] **Step 2: Run the cursor tests and verify RED**

Run:

```bash
npm test -- components/__tests__/splash-cursor.test.tsx
```

Expected: the reduced-motion/coarse-pointer tests FAIL because WebGL currently initializes unconditionally.

- [ ] **Step 3: Add the minimal guard before WebGL initialization**

At the start of the existing effect, before reading the canvas context:

```ts
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
const usesCoarsePointer = window.matchMedia("(pointer: coarse)").matches

if (prefersReducedMotion || usesCoarsePointer) return
```

Retain the existing `motion-reduce:hidden` class as a CSS fallback. Do not refactor the shader or simulation internals in this task.

- [ ] **Step 4: Run the cursor tests and verify GREEN**

Run:

```bash
npm test -- components/__tests__/splash-cursor.test.tsx
```

Expected: all cursor guard tests PASS.

- [ ] **Step 5: Commit the cursor guard**

```bash
git add components/SplashCursor.tsx components/__tests__/splash-cursor.test.tsx
git commit -m "fix: respect reduced motion for splash cursor"
```

## Task 8: Apply the Final Dark Editorial Styling

**Files:**

- Modify: `components/home/home-intro.tsx`
- Modify: `components/home/selected-projects.tsx`
- Modify: `components/home/selected-notes.tsx`
- Modify: `components/home/about-jason.tsx`
- Modify: `components/home/say-hello.tsx`
- Modify: `components/site-header.tsx`
- Modify: `app/globals.css` only if a repeated pattern cannot stay readable as component classes.

- [ ] **Step 1: Run existing component tests before visual refinement**

Run:

```bash
npm test -- components/home components/__tests__/site-header.test.tsx app/__tests__/homepage.test.tsx
```

Expected: PASS before styling changes.

- [ ] **Step 2: Apply the approved visual hierarchy**

Use Tailwind classes to implement:

- Near-black existing background and current neutral text tokens.
- Fluid first-screen heading with `clamp()` via an arbitrary `text-[clamp(...)]` value.
- Non-symmetric desktop hero columns and a single-column mobile flow.
- Thin, low-contrast separators instead of rounded card grids.
- Numbered project rows with restrained hover color/translation and `motion-reduce:transform-none`.
- About section with `/jason-hd.png`, a subtle alternate dark surface, and no badge cloud.
- Generous, varied vertical rhythm between sections.
- Contact actions with one text-link hierarchy; neither action should resemble an enterprise primary CTA.

Do not add gradient text, cyan/purple glow decorations, glass card stacks, or new animation systems. The existing cursor supplies the color and motion.

- [ ] **Step 3: Verify responsive source constraints**

Run:

```bash
rg -n "md:|lg:|motion-reduce|focus-visible|text-\[clamp" components/home components/site-header.tsx
```

Expected: responsive, focus-visible, and reduced-motion classes are present in the relevant components.

- [ ] **Step 4: Re-run component tests and lint**

Run:

```bash
npm test -- components/home components/__tests__/site-header.test.tsx app/__tests__/homepage.test.tsx
npm run lint
```

Expected: tests PASS; lint has no errors. Existing `SplashCursor.tsx` inline-class warnings may remain because shader refactoring is explicitly out of scope.

- [ ] **Step 5: Commit the visual refinement**

```bash
git add components/home components/site-header.tsx app/globals.css
git commit -m "style: refine dark editorial homepage"
```

## Task 9: Full Verification and Visual QA

**Files:**

- No production changes expected; fix only issues found by verification.

- [ ] **Step 1: Run the full automated suite**

Run:

```bash
npm test
npm run lint
npm run build
```

Expected: all tests PASS, ESLint reports no errors, and Next.js production build exits 0.

- [ ] **Step 2: Start the site and inspect desktop**

Run:

```bash
npm run dev
```

At `http://localhost:3000`, verify at approximately 1440×900:

- Black background and colorful `SplashCursor` remain visible.
- Header contains only Jason Huang and the four approved navigation items.
- Project and article anchors land at the correct sections.
- No capability map, training, enterprise, cases, badge cloud, or sales CTA is visible.
- WeChat QR is hidden by default, opens on trigger, closes with Escape/outside action, and focus returns.
- Xiaohongshu opens the existing profile in a new tab.

- [ ] **Step 3: Inspect mobile and reduced motion**

At approximately 390×844 and with reduced motion enabled, verify:

- Sections become single-column without horizontal overflow.
- The WeChat disclosure is a bottom sheet with a clear close control.
- The QR remains complete and can be long-pressed/saved.
- `SplashCursor` does not initialize on coarse pointers or reduced-motion settings.
- Navigation remains usable through the mobile menu.

- [ ] **Step 4: Scan the deployed-format QR asset**

Open `http://localhost:3000/wechat-qr.jpg` and scan it in WeChat.

Expected: WeChat recognizes the code and offers to add the intended account.

- [ ] **Step 5: Review the final diff for scope and user changes**

Run:

```bash
git status --short
git diff --check
git diff --stat 4a13a78..HEAD
```

Expected: only planned files changed. Preserve the user's pre-existing modification to `public/Jason-img.jpeg`; do not stage or overwrite it.

- [ ] **Step 6: Commit any verification-only corrections**

If verification required fixes:

```bash
git add <only-the-files-fixed-during-verification>
git commit -m "fix: address homepage verification findings"
```

If no fixes were required, do not create an empty commit.
