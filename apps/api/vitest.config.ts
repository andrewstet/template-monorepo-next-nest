import path from "node:path";

import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

const rootDir = process.cwd();

export default defineConfig({
  oxc: false,
  plugins: [
    swc.vite({
      module: { type: "es6" },
    }),
  ],
  resolve: {
    alias: {
      src: path.resolve(rootDir, "src"),
    },
  },
  test: {
    environment: "node",
    globals: true,
    include: ["src/**/*.spec.ts"],
    coverage: {
      provider: "v8",
      reportsDirectory: "coverage",
      include: ["src/**/*.{ts,js}"],
    },
  },
});
