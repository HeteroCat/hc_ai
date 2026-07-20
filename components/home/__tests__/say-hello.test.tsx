import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it, vi } from "vitest"

import { SayHello } from "@/components/home/say-hello"

const xiaohongshuHref = "https://www.xiaohongshu.com/user/profile/jason"
const defaultMatchMedia = window.matchMedia

function mockDesktopMediaQuery() {
  window.matchMedia = vi.fn((query: string) => ({
    matches: query === "(min-width: 640px)",
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as typeof window.matchMedia
}

afterEach(() => {
  window.matchMedia = defaultMatchMedia
})

describe("SayHello", () => {
  it("renders its semantic invitation without exposing a separate nickname", () => {
    const { container } = render(<SayHello xiaohongshuHref={xiaohongshuHref} />)

    expect(container.firstElementChild).toMatchObject({ tagName: "SECTION", id: "contact" })
    expect(screen.getByText("如果你也在做有趣的东西，欢迎认识一下。")).toBeInTheDocument()
    expect(screen.queryByText("JasonHuang")).not.toBeInTheDocument()
  })

  it("opens the mobile WeChat sheet only when requested", async () => {
    const user = userEvent.setup()
    render(<SayHello xiaohongshuHref={xiaohongshuHref} />)

    const trigger = screen.getByRole("button", { name: /微信/ })
    expect(screen.queryByRole("dialog", { name: "微信联系" })).not.toBeInTheDocument()
    expect(trigger).toHaveAttribute("aria-expanded", "false")

    await user.click(trigger)

    expect(screen.getByRole("dialog", { name: "微信联系" })).toBeInTheDocument()
    expect(screen.getByRole("img", { name: "Jason 的微信二维码" }))
      .toHaveAttribute("src", "/wechat-qr.jpg")
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    expect(trigger).toHaveAttribute("aria-controls")
    expect(trigger.getAttribute("aria-controls")).toBe(
      screen.getByRole("dialog", { name: "微信联系" }).id,
    )
  })

  it("closes the mobile sheet with Escape and restores trigger focus", async () => {
    const user = userEvent.setup()
    render(<SayHello xiaohongshuHref={xiaohongshuHref} />)
    const trigger = screen.getByRole("button", { name: /微信/ })

    await user.click(trigger)
    await user.keyboard("{Escape}")

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "微信联系" })).not.toBeInTheDocument()
    })
    expect(trigger).toHaveFocus()
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })

  it("light-dismisses the mobile sheet from its overlay", async () => {
    const user = userEvent.setup()
    render(<SayHello xiaohongshuHref={xiaohongshuHref} />)

    await user.click(screen.getByRole("button", { name: /微信/ }))
    const overlay = document.querySelector<HTMLElement>("[data-slot='sheet-overlay']")
    expect(overlay).not.toBeNull()

    fireEvent.pointerDown(overlay!)
    fireEvent.pointerUp(overlay!)
    fireEvent.click(overlay!)

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "微信联系" })).not.toBeInTheDocument()
    })
  })

  it("replaces a broken QR with an actionable Xiaohongshu fallback", async () => {
    const user = userEvent.setup()
    render(<SayHello xiaohongshuHref={xiaohongshuHref} />)

    await user.click(screen.getByRole("button", { name: /微信/ }))
    fireEvent.error(screen.getByRole("img", { name: "Jason 的微信二维码" }))

    expect(screen.queryByRole("img", { name: "Jason 的微信二维码" })).not.toBeInTheDocument()
    expect(screen.getByText("二维码暂时无法加载")).toBeInTheDocument()
    expect(screen.getByText(/可以前往小红书联系/)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "前往小红书联系" }))
      .toHaveAttribute("href", xiaohongshuHref)
  })

  it("uses a secure external Xiaohongshu invitation", () => {
    render(<SayHello xiaohongshuHref={xiaohongshuHref} />)

    const link = screen.getByRole("link", { name: "在小红书认识 Jason" })
    expect(link).toHaveAttribute("href", xiaohongshuHref)
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("opens an anchored desktop popover and light-dismisses it with focus restored", async () => {
    mockDesktopMediaQuery()
    const user = userEvent.setup()
    render(<SayHello xiaohongshuHref={xiaohongshuHref} />)
    const trigger = screen.getByRole("button", { name: /微信/ })

    expect(window.matchMedia).toHaveBeenCalledWith("(min-width: 640px)")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    await user.click(trigger)

    const popover = screen.getByRole("dialog", { name: "微信联系" })
    expect(popover).toHaveAttribute("data-side", "top")
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    expect(trigger).toHaveAttribute("aria-controls", popover.id)

    await waitFor(() => expect(popover).toHaveAttribute("data-state", "open"))
    fireEvent.pointerDown(document.body, { button: 0, ctrlKey: false, pointerType: "mouse" })
    fireEvent.pointerUp(document.body, { button: 0, ctrlKey: false, pointerType: "mouse" })
    fireEvent.click(document.body, { button: 0, ctrlKey: false })

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "微信联系" })).not.toBeInTheDocument()
    })
    expect(trigger).toHaveFocus()
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })
})
