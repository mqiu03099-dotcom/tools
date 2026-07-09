export interface QueryResultRow<T> {
  rows: T[];
  rowCount: number | null;
}

export interface QueryClient {
  query<T>(sql: string, params?: unknown[]): Promise<QueryResultRow<T>>;
}
