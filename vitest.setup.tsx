import "@testing-library/jest-dom/vitest"

import { cleanup } from "@testing-library/react"
import type { ImgHTMLAttributes } from "react"
import { afterEach, vi } from "vitest"

afterEach(cleanup)

vi.mock("next/image", () => ({
  default: ({
    fill,
    priority,
    ...imageProps
  }: ImgHTMLAttributes<HTMLImageElement> & {
    fill?: boolean
    priority?: boolean
  }) => {
    void fill
    void priority

    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...imageProps} />
  },
}))

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}))

vi.mock("next/font/local", () => ({
  default: () => ({ className: "", variable: "" }),
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
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

vi.stubGlobal("ResizeObserver", ResizeObserverMock)
vi.stubGlobal("PointerEvent", MouseEvent)

HTMLElement.prototype.scrollIntoView = vi.fn()
HTMLElement.prototype.hasPointerCapture = vi.fn()
HTMLElement.prototype.setPointerCapture = vi.fn()
HTMLElement.prototype.releasePointerCapture = vi.fn()
