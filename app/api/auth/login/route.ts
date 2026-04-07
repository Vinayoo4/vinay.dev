import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET environment variable is required in production');
}
const SECRET = JWT_SECRET || 'fallback-dev-secret-change-in-production';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password)
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });

  const db = getDb();
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
  if (!user) return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });

  const token = jwt.sign({ user: { id: user.id, role: user.role } }, SECRET, { expiresIn: '7d' });
  return NextResponse.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
}
