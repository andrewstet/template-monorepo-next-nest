import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import path from "node:path";

const zodCoreShim = "src/shims/zod-v4-core.ts";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    resolveAlias: {
      "zod/v4/core": `./${zodCoreShim}`,
    },
  },
  webpack: (config) => {
    config.resolve = config.resolve ?? {};

    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "zod/v4/core": path.join(process.cwd(), zodCoreShim),
    };

    return config;
  },
};

export default withSentryConfig(nextConfig, {
  silent: true,
  webpack: {
    treeshake: {
      removeDebugLogging: true,
    },
  },

  // Source map behavior (pick what you want)
  sourcemaps: {
    // If you want Sentry to upload sourcemaps when auth token exists, leave `disable` unset/false.
    // If you want to fully turn off sourcemaps handling, set:
    // disable: true,

    // Common template default: upload during CI, then delete from build output
    // once uploaded (only happens when Sentry upload is actually configured).
    deleteSourcemapsAfterUpload: true,
  },

  // Optional: bundle size trimming knobs (safe defaults)
  bundleSizeOptimizations: {
    excludeDebugStatements: true,
  },
});
