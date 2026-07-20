import { render } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import SplashCursor from "@/components/SplashCursor"

const defaultMatchMedia = window.matchMedia

function createMatchMediaMock(matchingQuery: string): typeof window.matchMedia {
  return vi.fn((query: string): MediaQueryList => ({
    matches: query === matchingQuery,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(() => false),
  }))
}

afterEach(() => {
  window.matchMedia = defaultMatchMedia
  vi.restoreAllMocks()
})

describe.each([
  "(prefers-reduced-motion: reduce)",
  "(pointer: coarse)",
])("SplashCursor with %s", (matchingQuery) => {
  it("does not initialize WebGL", () => {
    window.matchMedia = createMatchMediaMock(matchingQuery)
    const getContext = vi
      .spyOn(HTMLCanvasElement.prototype, "getContext")
      .mockReturnValue(null)

    const { container } = render(<SplashCursor />)

    expect(getContext).not.toHaveBeenCalled()
    expect(container.firstElementChild).toHaveClass("z-30")
  })
})
