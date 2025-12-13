const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = './client/public/assets';

async function optimizeMenuImages() {
  const files = fs.readdirSync(assetsDir);

  for (const file of files) {
    if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;

    const inputPath = path.join(assetsDir, file);
    const baseName = path.parse(file).name;
    const ext = path.parse(file).ext;
    
    const stats = fs.statSync(inputPath);
    console.log(`\nProcessing ${file} (${(stats.size / 1024 / 1024).toFixed(2)} MB)...`);

    const backupPath = path.join(assetsDir, `${baseName}-original${ext}`);
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
      console.log(`  ✓ Backed up original`);
    }

    await sharp(inputPath)
      .resize(800, null, { withoutEnlargement: true })
      .jpeg({ quality: 75, mozjpeg: true })
      .toFile(path.join(assetsDir, `${baseName}-temp.jpg`));
    
    fs.renameSync(path.join(assetsDir, `${baseName}-temp.jpg`), inputPath.replace(/\.(jpg|jpeg|png)$/i, '.jpg'));
    
    const newJpgStats = fs.statSync(inputPath.replace(/\.(jpg|jpeg|png)$/i, '.jpg'));
    console.log(`  ✓ Optimized JPG: ${(newJpgStats.size / 1024).toFixed(0)} KB`);

    const webpPath = path.join(assetsDir, `${baseName}.webp`);
    await sharp(inputPath.replace(/\.(jpg|jpeg|png)$/i, '.jpg'))
      .webp({ quality: 75 })
      .toFile(path.join(assetsDir, `${baseName}-temp.webp`));
    
    fs.renameSync(path.join(assetsDir, `${baseName}-temp.webp`), webpPath);
    
    const webpStats = fs.statSync(webpPath);
    console.log(`  ✓ Optimized WebP: ${(webpStats.size / 1024).toFixed(0)} KB`);
  }

  console.log('\n✅ All menu images optimized!');
}

optimizeMenuImages().catch(console.error);
