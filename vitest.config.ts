import { defineConfig } from "vitest/config";

export default defineConfig({
  // Avoid loading project PostCSS config during tests
  css: {
    postcss: {
      plugins: [],
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    coverage: {
      reporter: ["text", "html"],
    },
  },
});
