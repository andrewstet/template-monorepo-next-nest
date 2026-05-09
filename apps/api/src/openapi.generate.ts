import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { createOpenApiDocument } from "./openapi";

const DEFAULT_OUTPUT_PATH = "../../docs/api/openapi.json";

async function generateOpenApi(): Promise<void> {
  const outputPath = resolve(process.cwd(), process.argv[2] ?? DEFAULT_OUTPUT_PATH);
  const app = await NestFactory.create(AppModule, { logger: false });

  try {
    const document = createOpenApiDocument(app);

    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, `${JSON.stringify(document, null, 2)}\n`);

    console.log(`OpenAPI document written to ${outputPath}`);
  } finally {
    await app.close();
  }
}

void generateOpenApi().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
