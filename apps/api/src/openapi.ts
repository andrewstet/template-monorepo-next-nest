import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const OPENAPI_JSON_PATH = "openapi.json";
export const SWAGGER_UI_PATH = "docs";

export function createOpenApiDocument(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("Next/Nest Monorepo API")
    .setDescription("OpenAPI contract for the Nest API.")
    .setVersion("1.0.0")
    .build();

  return SwaggerModule.createDocument(app, config);
}

export function setupOpenApi(app: INestApplication): void {
  const document = createOpenApiDocument(app);

  SwaggerModule.setup(SWAGGER_UI_PATH, app, document, {
    jsonDocumentUrl: `/${OPENAPI_JSON_PATH}`,
  });
}
