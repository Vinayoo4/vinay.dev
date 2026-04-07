/**
 * Script to create an admin user in the local SQLite database.
 * Run with: node scripts/create-admin.js
 *
 * The script seeds a default admin user if one does not already exist.
 * Credentials default to ADMIN_EMAIL / ADMIN_PASSWORD from .env, or the
 * hard-coded fallback values below.
 */

require('dotenv').config();
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const { randomUUID } = require('crypto');

const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_PATH = path.join(DATA_DIR, 'portfolio.db');
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

// Ensure the users table exists
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

const adminEmail = process.env.ADMIN_EMAIL || 'admin@vinay.dev';
const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';
const adminName = process.env.ADMIN_NAME || 'Admin';

const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(adminEmail);
if (existing) {
  console.log(`Admin user already exists: ${adminEmail}`);
  process.exit(0);
}

const hash = bcrypt.hashSync(adminPassword, 10);
const id = randomUUID();
db.prepare('INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)').run(id, adminName, adminEmail, hash, 'admin');

console.log('Admin user created successfully');
console.log(`  Email:    ${adminEmail}`);
console.log(`  Password: ${adminPassword}`);
console.log('Change the password in production!');
process.exit(0);
