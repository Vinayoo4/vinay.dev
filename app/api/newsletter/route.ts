import { NextRequest, NextResponse } from 'next/server';
import { getDb, generateId } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// GET /api/newsletter - list all subscribers (admin only)
export async function GET(req: NextRequest) {
  const user = verifyToken(req);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  if (user.role !== 'admin') return NextResponse.json({ message: 'Forbidden' }, { status: 403 });

  const db = getDb();
  const subscribers = db.prepare('SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC').all();
  return NextResponse.json(subscribers);
}

// POST /api/newsletter - subscribe
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ success: false, message: 'Valid email is required' }, { status: 400 });

  const db = getDb();
  const existing = db.prepare('SELECT id FROM newsletter_subscribers WHERE email = ?').get(email.toLowerCase().trim());
  if (existing) {
    return NextResponse.json({ success: false, message: 'This email is already subscribed.' }, { status: 409 });
  }

  const id = generateId();
  db.prepare('INSERT INTO newsletter_subscribers (id, email) VALUES (?, ?)').run(id, email.toLowerCase().trim());
  return NextResponse.json({ success: true, message: 'Subscribed successfully!' }, { status: 201 });
}
