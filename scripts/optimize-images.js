/**
 * Image Optimization Script
 * Converts large images to optimized WebP format
 * Run with: node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '../src/assets/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const imagesToOptimize = [
  { input: 'lone_camera.jpg', output: 'lone_camera.webp', width: 1200 },
  { input: 'mic1.jpg', output: 'mic1.webp', width: 800 },
  { input: 'podcast_mic.jpg', output: 'podcast_mic.webp', width: 1200 },
  { input: 'sound_desk.jpg', output: 'sound_desk.webp', width: 1200 },
  { input: 'studio_camera.jpg', output: 'studio_camera.webp', width: 1200 },
];

async function optimizeImages() {
  console.log('🖼️  Optimizing images...\n');

  // Copy logo (already small PNG, keep as-is for transparency)
  const logoSrc = path.join(INPUT_DIR, 'logo.png');
  const logoDest = path.join(OUTPUT_DIR, 'logo.png');
  fs.copyFileSync(logoSrc, logoDest);
  console.log('✅ Copied logo.png');

  // Copy hero (already WebP)
  const heroSrc = path.join(INPUT_DIR, 'High_tide_hero.webp');
  const heroDest = path.join(OUTPUT_DIR, 'hero.webp');
  fs.copyFileSync(heroSrc, heroDest);
  console.log('✅ Copied High_tide_hero.webp → hero.webp');

  // Optimize JPGs to WebP
  for (const img of imagesToOptimize) {
    const inputPath = path.join(INPUT_DIR, img.input);
    const outputPath = path.join(OUTPUT_DIR, img.output);

    try {
      const info = await sharp(inputPath)
        .resize(img.width, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);

      const originalSize = fs.statSync(inputPath).size;
      const newSize = info.size;
      const savings = ((1 - newSize / originalSize) * 100).toFixed(1);

      console.log(`✅ ${img.input} → ${img.output} (${savings}% smaller)`);
    } catch (err) {
      console.error(`❌ Error processing ${img.input}:`, err.message);
    }
  }

  console.log('\n🎉 Image optimization complete!');
}

optimizeImages();
