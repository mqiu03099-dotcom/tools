import type { API_CODE_FAIL, API_CODE_SUCCESS } from "../constants/apiResponse";

export type ApiCode = typeof API_CODE_SUCCESS | typeof API_CODE_FAIL;

export interface ApiPage {
  page: number;
  pageSize: number;
  total: number;
  totalPage: number;
}

export interface ApiResponse<T extends object | unknown[]> {
  code: ApiCode;
  msg: string;
  data: T;
  page?: ApiPage;
}
