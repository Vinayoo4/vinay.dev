import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// DELETE /api/contact/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = verifyToken(req);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  if (user.role !== 'admin') return NextResponse.json({ message: 'Forbidden' }, { status: 403 });

  const db = getDb();
  const msg = db.prepare('SELECT id FROM contact_messages WHERE id = ?').get(params.id);
  if (!msg) return NextResponse.json({ message: 'Message not found' }, { status: 404 });

  db.prepare('DELETE FROM contact_messages WHERE id = ?').run(params.id);
  return NextResponse.json({ success: true, message: 'Message deleted successfully' });
}
