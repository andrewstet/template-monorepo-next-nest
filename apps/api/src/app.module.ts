import crypto from "node:crypto";

import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        // Quiet request logs for health checks, etc.
        genReqId: () => crypto.randomUUID(),
        customAttributeKeys: {
          reqId: "requestId",
        },
        customErrorMessage: (error, res) => {
          return `request errored with status code ${res.statusCode}: ${getErrorMessage(error)}`;
        },
        customLogLevel: (_req, res, err) => {
          if (err) {
            return "silent";
          }

          if (res.statusCode >= 500) {
            return "silent";
          }

          return "info";
        },
        // Pretty logs in dev, JSON in prod
        transport:
          process.env.NODE_ENV === "production"
            ? undefined
            : {
                target: "pino-pretty",
                options: {
                  singleLine: true,
                },
              },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

function getErrorMessage(value: unknown): string {
  if (value instanceof Error) {
    return value.message;
  }

  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object" && "message" in value) {
    const maybeMessage = (value as { message?: unknown }).message;
    if (typeof maybeMessage === "string") {
      return maybeMessage;
    }
  }

  return "unknown error";
}
