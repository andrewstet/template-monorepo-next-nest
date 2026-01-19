import { Logger } from "nestjs-pino";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { initSentry } from "./observability/sentry";
import { SentryExceptionFilter } from "./observability/sentry-exception.filter";

async function bootstrap() {
  initSentry();

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useGlobalFilters(new SentryExceptionFilter());
  app.useLogger(app.get(Logger));

  await app.listen(process.env.PORT ?? 3001);
}

void bootstrap();
