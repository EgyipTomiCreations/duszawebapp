const fs = require('fs');
const sharp = require('sharp');

async function kepfeldolgozas(imageBuffer, szelesseg, magassag) {
  try {
    const svgBuffer = await sharp(imageBuffer).toFormat('svg').toBuffer();
    const resizedSvgBuffer = await sharp(svgBuffer)
      .resize(szelesseg, magassag)
      .toBuffer();
    const resizedSvgBase64 = resizedSvgBuffer.toString('base64');
    console.log('Sikeresen átalakítva és méretezve az SVG (base64 kódolva):', resizedSvgBase64);
    return resizedSvgBase64;
  } catch (error) {
    console.error('Hiba történt:', error.message);
    throw error;
  }
}

module.exports = kepfeldolgozas;

