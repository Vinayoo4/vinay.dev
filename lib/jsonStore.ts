import { promises as fs } from "fs";
import path from "path";

const ROOT = path.join(process.cwd(), "data");

export async function ensureDir(relativeDir: string) {
  const dir = path.join(ROOT, relativeDir);
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

export async function readJsonFile<T>(relativePath: string, fallback: T): Promise<T> {
  const absolutePath = path.join(ROOT, relativePath);
  try {
    const file = await fs.readFile(absolutePath, "utf-8");
    return JSON.parse(file) as T;
  } catch {
    return fallback;
  }
}

export async function writeJsonFile<T>(relativePath: string, value: T): Promise<void> {
  const absolutePath = path.join(ROOT, relativePath);
  await fs.mkdir(path.dirname(absolutePath), { recursive: true });
  await fs.writeFile(absolutePath, JSON.stringify(value, null, 2), "utf-8");
}

export async function appendJsonArrayItem<T>(relativePath: string, item: T): Promise<T[]> {
  const current = await readJsonFile<T[]>(relativePath, []);
  current.push(item);
  await writeJsonFile(relativePath, current);
  return current;
}

export function safeId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function isoNow() {
  return new Date().toISOString();
}
