const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './client/public/images';
const outputDir = './client/public/images/optimized';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const widths = [380, 760, 1024, 1536];

async function optimizeImages() {
  if (!fs.existsSync(inputDir)) {
    console.log('No images directory found, skipping optimization.');
    return;
  }

  const files = fs.readdirSync(inputDir);

  for (const file of files) {
    if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;

    const inputPath = path.join(inputDir, file);
    const baseName = path.parse(file).name;

    console.log(`Optimizing ${file}...`);

    for (const width of widths) {
      await sharp(inputPath)
        .resize(width)
        .webp({ quality: 85 })
        .toFile(path.join(outputDir, `${baseName}-${width}w.webp`));

      console.log(`  ✓ Generated ${baseName}-${width}w.webp`);
    }
  }

  console.log('✅ Image optimization complete!');
}

optimizeImages().catch(console.error);
