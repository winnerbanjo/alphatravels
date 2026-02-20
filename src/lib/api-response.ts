/**
 * Unified API response format for all backend routes.
 * Format: { success: boolean, data: any, error: string | null }
 */
import { NextResponse } from 'next/server';

export interface ApiResponseBody<T = unknown> {
  success: boolean;
  data: T | null;
  error: string | null;
}

export function success<T>(data: T, status = 200): NextResponse<ApiResponseBody<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      error: null,
    },
    { status }
  );
}

export function error(message: string, status = 500): NextResponse<ApiResponseBody<null>> {
  return NextResponse.json(
    {
      success: false,
      data: null,
      error: message,
    },
    { status }
  );
}

/** Wrap an API handler with global try-catch and consistent response format. */
export function withApiHandler<T>(
  handler: () => Promise<NextResponse<ApiResponseBody<T>> | NextResponse<ApiResponseBody<null>>>
): () => Promise<NextResponse<ApiResponseBody<T> | ApiResponseBody<null>>> {
  return async () => {
    try {
      return await handler();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      console.error('API Error:', err);
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: message,
        },
        { status: 500 }
      );
    }
  };
}
