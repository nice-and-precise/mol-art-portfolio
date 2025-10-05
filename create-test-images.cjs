const fs = require('fs');
const path = require('path');

// Create directory
const imgDir = path.join(__dirname, 'src/content/pieces/piece-01/images');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

// SVG template
function createSVG(width, height, color, text) {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${color}"/>
  <text x="50%" y="50%" font-family="Arial" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
</svg>`;
}

// Create main image
const mainSVG = createSVG(800, 800, '#d4a574', 'Earth Vessel - Main');
fs.writeFileSync(path.join(imgDir, 'main.svg'), mainSVG);

// Create detail texture
const textureSVG = createSVG(800, 800, '#b8895f', 'Texture Detail');
fs.writeFileSync(path.join(imgDir, 'detail-texture.svg'), textureSVG);

// Create detail glaze
const glazeSVG = createSVG(800, 800, '#e0b888', 'Glaze Detail');
fs.writeFileSync(path.join(imgDir, 'detail-glaze.svg'), glazeSVG);

console.log('Created 3 SVG test images successfully');
console.log('Files:', fs.readdirSync(imgDir));
