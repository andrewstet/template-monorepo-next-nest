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
    include: ["test/**/*.e2e-spec.ts"],
  },
});
