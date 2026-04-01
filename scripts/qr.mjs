/**
 * Після деплою: npm run qr -- https://ваш-сайт.netlify.app
 * Зберігає PNG у public/qr-deploy.png (додайте в .gitignore якщо потрібно).
 */
import QRCode from 'qrcode';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'public');
const url = process.argv[2];

if (!url) {
  console.error('Usage: npm run qr -- <https://production-url>');
  process.exit(1);
}

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, 'qr-deploy.png');

await QRCode.toFile(outFile, url, { width: 512, margin: 2, color: { dark: '#1a1824', light: '#ffffff' } });
console.log('QR saved:', outFile);
