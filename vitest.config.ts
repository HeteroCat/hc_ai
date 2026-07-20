import path from "node:path"
import { configDefaults, defineConfig } from "vitest/config"

export default defineConfig({
  resolve: { alias: { "@": path.resolve(process.cwd()) } },
  test: {
    clearMocks: true,
    environment: "jsdom",
    exclude: [...configDefaults.exclude, ".worktrees/**"],
    setupFiles: ["./vitest.setup.tsx"],
  },
})
