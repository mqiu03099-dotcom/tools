import { DEFAULT_FAIL_MSG } from "../constants/apiResponse";
import { ApiError } from "./apiError";
import { apiFail } from "./apiResponse";

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    return apiFail(error.message);
  }

  if (error instanceof Error) {
    return apiFail(error.message || DEFAULT_FAIL_MSG);
  }

  return apiFail(DEFAULT_FAIL_MSG);
}
