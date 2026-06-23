import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dataPath = path.join(root, 'src', 'data.js');

const stamp = new Date().toISOString();
const text = await fs.readFile(dataPath, 'utf8');

if (!text.includes('export const analysisWindowDays = 730;')) {
  throw new Error('Unexpected data file shape.');
}

console.log(`Weekly refresh checked at ${stamp}`);
console.log('No external paid ingestion configured yet; keeping current free/public data model.');
