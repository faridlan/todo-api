export interface WebSuccessResponse<T> {
  data: T;
  message?: string;
}

export interface WebErrorResponse {
  errors: Record<string, string[]>;
  message?: string;
}
