import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// DELETE /api/newsletter/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = verifyToken(req);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  if (user.role !== 'admin') return NextResponse.json({ message: 'Forbidden' }, { status: 403 });

  const db = getDb();
  const sub = db.prepare('SELECT id FROM newsletter_subscribers WHERE id = ?').get(params.id);
  if (!sub) return NextResponse.json({ message: 'Subscriber not found' }, { status: 404 });

  db.prepare('DELETE FROM newsletter_subscribers WHERE id = ?').run(params.id);
  return NextResponse.json({ success: true, message: 'Subscriber removed successfully' });
}
