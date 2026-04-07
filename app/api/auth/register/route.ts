import { NextRequest, NextResponse } from 'next/server';
import { getDb, generateId } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET environment variable is required in production');
}
const SECRET = JWT_SECRET || 'fallback-dev-secret-change-in-production';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password } = body;

  if (!name || typeof name !== 'string' || name.trim().length === 0)
    return NextResponse.json({ message: 'Name is required' }, { status: 400 });
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ message: 'Valid email is required' }, { status: 400 });
  if (!password || password.length < 6)
    return NextResponse.json({ message: 'Password must be at least 6 characters' }, { status: 400 });

  const db = getDb();
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) return NextResponse.json({ message: 'User already exists' }, { status: 400 });

  const hash = await bcrypt.hash(password, 10);
  const id = generateId();
  db.prepare('INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)').run(id, name.trim(), email.trim(), hash, 'user');

  const token = jwt.sign({ user: { id, role: 'user' } }, SECRET, { expiresIn: '7d' });
  return NextResponse.json({ token }, { status: 201 });
}
