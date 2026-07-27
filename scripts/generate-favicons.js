/**
 * Favicon Generator
 * Regenerates all favicon/touch-icon assets from a single source logo.
 * Run with: node scripts/generate-favicons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE = path.join(__dirname, '../public/images/hts_logo.png');
const OUT_DIR = path.join(__dirname, '../public/favicons');

const pngTargets = [
  { file: 'favicon-16x16.png', size: 16 },
  { file: 'favicon-32x32.png', size: 32 },
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'android-chrome-192x192.png', size: 192 },
  { file: 'android-chrome-512x512.png', size: 512 },
];

// Builds a valid .ico container embedding PNG-compressed images directly
// (supported by all modern browsers/OS per the ICO spec's PNG storage format).
function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dataOffset0 = headerSize + dirEntrySize * count;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4); // image count

  const dirEntries = [];
  const imageDatas = [];
  let offset = dataOffset0;

  for (const { size, buffer } of pngBuffers) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height (0 = 256)
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // image data size
    entry.writeUInt32LE(offset, 12); // offset of image data
    dirEntries.push(entry);
    imageDatas.push(buffer);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...imageDatas]);
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  console.log('🖼️  Generating favicons from hts_logo.png...\n');

  for (const { file, size } of pngTargets) {
    const buffer = await sharp(SOURCE)
      .resize(size, size, { fit: 'cover' })
      .png()
      .toBuffer();
    fs.writeFileSync(path.join(OUT_DIR, file), buffer);
    console.log(`✅ ${file} (${size}x${size})`);
  }

  const icoSizes = [16, 32, 48];
  const icoBuffers = [];
  for (const size of icoSizes) {
    const buffer = await sharp(SOURCE)
      .resize(size, size, { fit: 'cover' })
      .png()
      .toBuffer();
    icoBuffers.push({ size, buffer });
  }
  const ico = buildIco(icoBuffers);
  fs.writeFileSync(path.join(OUT_DIR, 'favicon.ico'), ico);
  console.log('✅ favicon.ico (16/32/48 combined)');

  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
