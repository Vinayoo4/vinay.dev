import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const decoded = verifyToken(req);
  if (!decoded) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const user = db.prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?').get(decoded.id) as any;
  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

  return NextResponse.json(user);
}
