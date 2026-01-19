import { z } from "zod";

/**
 * Minimal runtime surface that @hookform/resolvers expects from `zod/v4/core`.
 * Avoids deprecated Zod TS helper types and avoids `any`.
 */

type ZodLikeSchema<T> = {
  parse: (data: unknown, params?: unknown) => T;
  parseAsync: (data: unknown, params?: unknown) => Promise<T>;
};

export const $ZodError = z.core.$ZodError;

export const parse = <T>(schema: ZodLikeSchema<T>, data: unknown, params?: unknown): T => {
  return schema.parse(data, params);
};

export const parseAsync = <T>(
  schema: ZodLikeSchema<T>,
  data: unknown,
  params?: unknown,
): Promise<T> => {
  return schema.parseAsync(data, params);
};
