import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), '.content');

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');
  if (!key) return NextResponse.json(null);

  ensureDir();
  const filePath = path.join(DATA_DIR, `${key}.json`);
  if (!fs.existsSync(filePath)) return NextResponse.json(null);

  const raw = fs.readFileSync(filePath, 'utf-8');
  return NextResponse.json(JSON.parse(raw));
}

export async function POST(req: Request) {
  const { key, data } = await req.json();
  if (!key) {
    return NextResponse.json({ error: 'key required' }, { status: 400 });
  }

  ensureDir();
  const filePath = path.join(DATA_DIR, `${key}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json({ ok: true });
}
