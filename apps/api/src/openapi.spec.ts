import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppModule } from "./app.module";
import { createOpenApiDocument } from "./openapi";

describe("OpenAPI", () => {
  let app: INestApplication | undefined;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
  });

  afterEach(async () => {
    await app?.close();
  });

  it("generates the API document", () => {
    if (!app) {
      throw new Error("Nest app was not initialized");
    }

    const document = createOpenApiDocument(app);

    expect(document.info.title).toBe("Next/Nest Monorepo API");
    expect(document.paths).toHaveProperty("/");
  });
});
