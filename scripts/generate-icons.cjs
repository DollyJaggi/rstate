/* Generates PWA icons from public/favicon.svg using sharp.
   Run: node scripts/generate-icons.cjs */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const root = path.join(__dirname, '..')
const svgSource = fs.readFileSync(path.join(root, 'public', 'favicon.svg'))

// Full-bleed version (no rounded corners) for apple-touch + maskable backgrounds
const fullBleed = svgSource.toString().replace('rx="20"', 'rx="0"')
// Content scaled into the maskable safe zone (~80%)
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#2563eb"/>
  <g transform="translate(15,15) scale(0.7)">
    <path d="M50 15 L85 55 L75 55 L75 80 L55 80 L55 60 L45 60 L45 80 L25 80 L25 55 L15 55 Z" fill="white"/>
    <circle cx="50" cy="45" r="8" fill="#facc15"/>
  </g>
</svg>`

async function main() {
  const outDir = path.join(root, 'public', 'icons')
  fs.mkdirSync(outDir, { recursive: true })

  const jobs = [
    [svgSource, 192, 'icon-192.png'],
    [svgSource, 512, 'icon-512.png'],
    [Buffer.from(maskableSvg), 512, 'icon-maskable-512.png'],
    [Buffer.from(fullBleed), 180, 'apple-touch-icon.png'],
  ]

  for (const [input, size, name] of jobs) {
    await sharp(input, { density: 400 })
      .resize(size, size)
      .png()
      .toFile(path.join(outDir, name))
    console.log('created', name)
  }
}

main().catch(err => { console.error(err); process.exit(1) })
