import {
  API_CODE_FAIL,
  API_CODE_SUCCESS,
  DEFAULT_FAIL_MSG,
  DEFAULT_SUCCESS_MSG
} from "../constants/apiResponse";
import type { ApiPage, ApiResponse } from "../types/apiResponse";

export function apiSuccess<T extends object | unknown[]>(
  data: T,
  msg = DEFAULT_SUCCESS_MSG,
  page?: ApiPage
): ApiResponse<T> {
  const response: ApiResponse<T> = {
    code: API_CODE_SUCCESS,
    msg,
    data
  };

  if (page) {
    response.page = page;
  }

  return response;
}

export function apiFail<T extends object | unknown[] = Record<string, never>>(
  msg = DEFAULT_FAIL_MSG,
  data = {} as T
): ApiResponse<T> {
  return {
    code: API_CODE_FAIL,
    msg,
    data
  };
}
