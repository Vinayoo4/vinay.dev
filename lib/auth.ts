import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET environment variable is required in production');
}
const SECRET = JWT_SECRET || 'fallback-dev-secret-change-in-production';

interface JwtPayload {
  id: string;
  role: string;
}

export function verifyToken(req: NextRequest): JwtPayload | null {
  const token = req.headers.get('x-auth-token') || req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, SECRET) as { user: JwtPayload };
    return decoded.user;
  } catch {
    return null;
  }
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign({ user: payload }, SECRET, { expiresIn: '7d' });
}
