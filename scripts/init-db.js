/**
 * Database initialization script.
 * Run via: npm run db:init
 * Creates all required tables and seeds the default admin user.
 */
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const { randomUUID } = require('crypto');

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_PATH = path.join(DATA_DIR, 'portfolio.db');
console.log(`[db:init] Initializing database at: ${DB_PATH}`);

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

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

const adminEmail = process.env.ADMIN_EMAIL || 'admin@vinay.dev';
const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(adminEmail);
if (!existing) {
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';
  const hash = bcrypt.hashSync(adminPassword, 10);
  db.prepare(
    'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)'
  ).run(randomUUID(), 'Admin', adminEmail, hash, 'admin');
  console.log(`[db:init] Default admin user created: ${adminEmail}`);
}

console.log('[db:init] Database schema initialized successfully.');
