import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '..', 'public', 'icons');

function svgForSize(size) {
  const fs = Math.round(size * 0.28);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7b4fd4"/>
      <stop offset="100%" stop-color="#5232a3"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="url(#g)"/>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle"
    font-size="${fs}" font-weight="800" font-family="Nunito,system-ui,sans-serif" fill="#ffffff">Ку</text>
</svg>`;
}

async function makePng(size, name) {
  const buf = await sharp(Buffer.from(svgForSize(size))).png().toBuffer();
  writeFileSync(join(iconsDir, name), buf);
  console.log('wrote', name);
}

await makePng(192, 'icon-192.png');
await makePng(512, 'icon-512.png');
