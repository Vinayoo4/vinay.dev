import { NextRequest, NextResponse } from 'next/server';

/**
 * Logging middleware – wraps an API route handler and logs method, path,
 * status code, and response time for every request.
 */
export function withLogging(
  handler: (req: NextRequest, ctx?: any) => Promise<NextResponse>
) {
  return async (req: NextRequest, ctx?: any): Promise<NextResponse> => {
    const start = Date.now();
    let res: NextResponse;
    try {
      res = await handler(req, ctx);
    } catch (err) {
      const elapsed = Date.now() - start;
      console.error(`[API] ${req.method} ${req.nextUrl.pathname} 500 ${elapsed}ms`, err);
      throw err;
    }
    const elapsed = Date.now() - start;
    console.log(`[API] ${req.method} ${req.nextUrl.pathname} ${res.status} ${elapsed}ms`);
    return res;
  };
}
