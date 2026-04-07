import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

// Store DB in a persistent data directory (respects DATA_DIR env var for Docker)
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'portfolio.db');

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (_db) return _db;
  _db = new Database(DB_PATH);
  _db.pragma('journal_mode = WAL');
  _db.pragma('foreign_keys = ON');
  initSchema(_db);
  return _db;
}

function initSchema(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS chat_messages (
      id TEXT PRIMARY KEY,
      user TEXT NOT NULL,
      message TEXT NOT NULL,
      room TEXT NOT NULL DEFAULT 'general',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_chat_room ON chat_messages(room);
    CREATE INDEX IF NOT EXISTS idx_chat_room_time ON chat_messages(room, created_at);

    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      subscribed_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // Seed a default admin user if none exists
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@vinay.dev';
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(adminEmail);
  if (!existing) {
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';
    const hash = bcrypt.hashSync(adminPassword, 10);
    db.prepare(
      'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)'
    ).run(randomUUID(), 'Admin', adminEmail, hash, 'admin');
    console.log(`[DB] Default admin user created: ${adminEmail}`);
  }
}

export function generateId(): string {
  return randomUUID();
}
