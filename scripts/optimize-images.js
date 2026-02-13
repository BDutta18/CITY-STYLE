import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const inputDir = path.join(__dirname, '../public/assets')
const outputDir = path.join(__dirname, '../public/assets/optimized')

// Images that need responsive sizes (larger images)
const responsiveImages = [
  'header (1).png',
  'sale.png',
  'download.png',
  'hoodie.jpg',
  'arrival-2.jpg',
  'favourite-2.jpg',
  'Selena Gomez.webp'
]

// Sizes for responsive images
const sizes = [480, 768, 1024, 1440]

// Small images that just need WebP conversion
const smallImages = [
  'banner-1.png', 'banner-2.png', 'banner-3.png', 'banner-4.png',
  'banner-5.png', 'banner-6.png', 'banner-7.png', 'banner-8.png',
  'google.png', 'apple.png'
]

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}

async function optimizeResponsiveImage(filename) {
  const inputPath = path.join(inputDir, filename)
  const baseName = path.parse(filename).name
  const ext = path.parse(filename).ext

  console.log(`\nOptimizing ${filename}...`)

  try {
    // Get original metadata
    const metadata = await sharp(inputPath).metadata()
    const originalSize = (await fs.stat(inputPath)).size

    let totalSaved = 0
    let optimizedCount = 0

    // Create responsive sizes
    for (const width of sizes) {
      if (width > metadata.width) continue // Skip sizes larger than original

      // WebP version
      const webpPath = path.join(outputDir, `${baseName}-${width}.webp`)
      const webpInfo = await sharp(inputPath)
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(webpPath)
      
      console.log(`  ✓ ${baseName}-${width}.webp (${(webpInfo.size / 1024).toFixed(1)}KB)`)
      totalSaved += originalSize - webpInfo.size
      optimizedCount++

      // Original format version (compressed)
      const compressedPath = path.join(outputDir, `${baseName}-${width}${ext}`)
      let pipeline = sharp(inputPath).resize(width, null, { withoutEnlargement: true })
      
      if (ext === '.jpg' || ext === '.jpeg') {
        pipeline = pipeline.jpeg({ quality: 85 })
      } else if (ext === '.png') {
        pipeline = pipeline.png({ quality: 85, compressionLevel: 9 })
      }
      
      const compressedInfo = await pipeline.toFile(compressedPath)
      console.log(`  ✓ ${baseName}-${width}${ext} (${(compressedInfo.size / 1024).toFixed(1)}KB)`)
      optimizedCount++
    }

    // Create full-size WebP
    const fullWebpPath = path.join(outputDir, `${baseName}.webp`)
    const fullWebpInfo = await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(fullWebpPath)
    console.log(`  ✓ ${baseName}.webp (${(fullWebpInfo.size / 1024).toFixed(1)}KB)`)
    totalSaved += originalSize - fullWebpInfo.size

    console.log(`  Original: ${(originalSize / 1024).toFixed(1)}KB | Saved: ${(totalSaved / 1024 / optimizedCount).toFixed(1)}KB avg per file`)
  } catch (err) {
    console.error(`  ✗ Error optimizing ${filename}:`, err.message)
  }
}

async function optimizeSmallImage(filename) {
  const inputPath = path.join(inputDir, filename)
  const baseName = path.parse(filename).name

  console.log(`\nOptimizing ${filename}...`)

  try {
    const originalSize = (await fs.stat(inputPath)).size

    // WebP version
    const webpPath = path.join(outputDir, `${baseName}.webp`)
    const webpInfo = await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(webpPath)
    
    const saved = originalSize - webpInfo.size
    const percent = ((saved / originalSize) * 100).toFixed(1)
    console.log(`  ✓ ${baseName}.webp (${(webpInfo.size / 1024).toFixed(1)}KB) - Saved ${percent}%`)
  } catch (err) {
    console.error(`  ✗ Error optimizing ${filename}:`, err.message)
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n')
  
  await ensureDir(outputDir)

  console.log('📸 Optimizing responsive images with multiple sizes...')
  for (const img of responsiveImages) {
    await optimizeResponsiveImage(img)
  }

  console.log('\n\n🏷️  Optimizing small images (WebP only)...')
  for (const img of smallImages) {
    await optimizeSmallImage(img)
  }

  console.log('\n\n✅ Image optimization complete!')
  console.log(`📁 Optimized images saved to: ${outputDir}`)
}

main().catch(console.error)
