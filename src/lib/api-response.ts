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

/** Detect MongoDB connection / timeout errors for clean 503 (avoids site crash). */
export function isMongoConnectionError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  const msg = err.message?.toLowerCase() ?? '';
  const name = (err as { name?: string }).name ?? '';
  return (
    name === 'MongoServerSelectionError' ||
    name === 'MongoNetworkError' ||
    name === 'MongoTimeoutError' ||
    msg.includes('connection') ||
    msg.includes('econnrefused') ||
    msg.includes('timed out') ||
    msg.includes('network')
  );
}

/**
 * Global error handler: returns 503 for MongoDB connection timeouts, 500 otherwise.
 * Use in API routes: catch (e) { return handleApiError(e); }
 */
export function handleApiError(err: unknown): NextResponse<ApiResponseBody<null>> {
  const message = err instanceof Error ? err.message : 'An unexpected error occurred';
  console.error('API Error:', err);
  if (isMongoConnectionError(err)) {
    return error('Service temporarily unavailable. Please try again.', 503);
  }
  return error(message, 500);
}

/** Wrap an API handler with global try-catch and consistent response format. */
export function withApiHandler<T>(
  handler: () => Promise<NextResponse<ApiResponseBody<T>> | NextResponse<ApiResponseBody<null>>>
): () => Promise<NextResponse<ApiResponseBody<T> | ApiResponseBody<null>>> {
  return async () => {
    try {
      return await handler();
    } catch (err) {
      return handleApiError(err);
    }
  };
}
