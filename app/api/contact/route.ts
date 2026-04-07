import { NextRequest, NextResponse } from 'next/server';
import { getDb, generateId } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// GET /api/contact - list all messages (admin only)
export async function GET(req: NextRequest) {
  const user = verifyToken(req);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  if (user.role !== 'admin') return NextResponse.json({ message: 'Forbidden' }, { status: 403 });

  const db = getDb();
  const messages = db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC').all();
  return NextResponse.json(messages);
}

// POST /api/contact - submit a contact message
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, message } = body;

  if (!name || typeof name !== 'string' || name.trim().length === 0)
    return NextResponse.json({ message: 'Name is required' }, { status: 400 });
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ message: 'Valid email is required' }, { status: 400 });
  if (!message || typeof message !== 'string' || message.trim().length === 0)
    return NextResponse.json({ message: 'Message is required' }, { status: 400 });

  const db = getDb();
  const id = generateId();
  db.prepare(
    'INSERT INTO contact_messages (id, name, email, message) VALUES (?, ?, ?, ?)'
  ).run(id, name.trim(), email.trim(), message.trim());

  return NextResponse.json({ success: true, message: 'Message sent successfully' }, { status: 201 });
}
