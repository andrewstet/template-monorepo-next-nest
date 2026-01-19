import nextJest from "next/jest.js";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const zodResolverEsm = require.resolve("@hookform/resolvers/zod/dist/zod.mjs");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Make TS/TSX run as ESM so imports don't compile to require()
  extensionsToTreatAsEsm: [".ts", ".tsx"],

  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: { syntax: "typescript", tsx: true },
          transform: { react: { runtime: "automatic" } },
        },
        module: { type: "es6" },
      },
    ],
  },

  moduleNameMapper: {
    // Jest cannot resolve `zod/v4/core` (internal Zod v4 subpath)
    // when imported by @hookform/resolvers in ESM mode.
    // This shim maps it to the public z.core export for tests only.
    "^zod/v4/core$": "<rootDir>/src/shims/zod-v4-core.ts",

    "^@hookform/resolvers/zod$": zodResolverEsm,
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default createJestConfig(customJestConfig);
