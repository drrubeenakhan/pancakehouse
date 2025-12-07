const sharp = require('sharp');
const path = require('path');

const publicDir = './client/public';

async function enhanceAndOptimize() {
  console.log('🎨 Enhancing and optimizing images...\n');

  const heroSource = path.join(publicDir, 'hero.jpg');
  
  console.log('1. Enhancing hero image colors (saturation + vibrance)...');
  
  const heroBuffer = await sharp(heroSource)
    .modulate({
      saturation: 1.25,
      brightness: 1.02
    })
    .linear(1.08, -(128 * 0.08))
    .toBuffer();

  await sharp(heroBuffer)
    .resize(600, null, { withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(path.join(publicDir, 'hero.webp'));
  console.log('   ✓ hero.webp (600w) - enhanced colors');

  await sharp(heroBuffer)
    .resize(400, null, { withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(publicDir, 'hero-400.webp'));
  console.log('   ✓ hero-400.webp (400w) - enhanced colors');

  await sharp(heroBuffer)
    .resize(900, null, { withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(path.join(publicDir, 'hero-900.webp'));
  console.log('   ✓ hero-900.webp (900w) - enhanced colors');

  console.log('\n✅ Image enhancement complete!');
  
  const stats600 = await sharp(path.join(publicDir, 'hero.webp')).metadata();
  const stats400 = await sharp(path.join(publicDir, 'hero-400.webp')).metadata();
  const stats900 = await sharp(path.join(publicDir, 'hero-900.webp')).metadata();
  
  console.log('\n📊 Generated sizes:');
  console.log(`   hero.webp: ${stats600.width}x${stats600.height}`);
  console.log(`   hero-400.webp: ${stats400.width}x${stats400.height}`);
  console.log(`   hero-900.webp: ${stats900.width}x${stats900.height}`);
}

enhanceAndOptimize().catch(console.error);
