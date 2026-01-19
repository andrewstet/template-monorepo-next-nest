import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";
import type { Request, Response } from "express";

import { Sentry } from "./sentry";

const logger = new Logger("Exceptions");

@Catch()
export class SentryExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    // Only send to Sentry when it's actually initialized
    if (process.env.SENTRY_DSN) {
      Sentry.withScope((scope) => {
        scope.setTag("layer", "api");

        // Helpful request context
        scope.setContext("request", {
          method: request.method,
          url: request.originalUrl ?? request.url,
        });

        // In the case of auth, add user context here

        Sentry.captureException(exception);
      });
    }

    // Preserve Nest's default HTTP response behavior
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse(); // string | object

      response.status(status).send(body);

      return;
    }

    response.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });

    logger.error(exception);
  }
}
