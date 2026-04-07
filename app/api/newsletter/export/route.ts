import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// GET /api/newsletter/export - download all subscribers as CSV (admin only)
export async function GET(req: NextRequest) {
  const user = verifyToken(req);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  if (user.role !== 'admin') return NextResponse.json({ message: 'Forbidden' }, { status: 403 });

  const db = getDb();
  const subscribers = db
    .prepare('SELECT email, subscribed_at FROM newsletter_subscribers ORDER BY subscribed_at DESC')
    .all() as { email: string; subscribed_at: string }[];

  const header = 'email,subscribed_at\n';
  const rows = subscribers
    .map((s) => `${JSON.stringify(s.email)},${JSON.stringify(s.subscribed_at)}`)
    .join('\n');
  const csv = header + rows;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
