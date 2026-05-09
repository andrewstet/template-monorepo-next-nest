import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
    alias: [
      {
        find: "zod/v4/core",
        replacement: path.resolve(dirname, "src/shims/zod-v4-core.ts"),
      },
      {
        find: /^zod$/,
        replacement: path.resolve(dirname, "node_modules/zod/index.js"),
      },
    ],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    deps: {
      optimizer: {
        client: {
          enabled: true,
          include: ["@hookform/resolvers/zod"],
        },
      },
    },
  },
});
