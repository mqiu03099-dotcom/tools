import type { EventHandler, EventHandlerRequest } from "h3";
import { defineEventHandler } from "h3";
import { handleApiError } from "./apiErrorHandler";

export function defineApiHandler<T extends EventHandlerRequest, D>(
  handler: EventHandler<T, Promise<D>>
) {
  return defineEventHandler<T>(async (event) => {
    try {
      return await handler(event);
    } catch (error) {
      return handleApiError(error);
    }
  });
}
