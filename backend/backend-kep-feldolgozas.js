const fs = require('fs');
const sharp = require('sharp');
const Bson = require('bson')

async function kepfeldolgozas(imageBufferInString, szelesseg, magassag, callback) {
  try {
    imageBuffer = new TextEncoder().encode(imageBufferInString);
    console.log(imageBuffer);
    console.log(Buffer.from(imageBuffer))
    if (!imageBuffer || !(imageBuffer instanceof Uint8Array)) {
      callback('Érvénytelen vagy hiányzó bemeneti kép.');

    }
    const metadata = await sharp(Buffer.from(imageBuffer)).metadata();
    console.log(metadata);


    if (metadata.format == 'svg') {
      console.log('A bemeneti kép SVG formátumú, csak átméretezés és kódolás történik');
      const resizedSvgBuffer = await sharp(imageBuffer).resize(szelesseg, magassag).toBuffer();
      const resizedSvgBase64 = resizedSvgBuffer.toString('base64');
      console.log('Sikeresen méretezve és kódolva az SVG:', resizedSvgBase64);
      callback(null, resizedSvgBase64)
    }
    const svgBuffer = await sharp(Buffer.from(imageBuffer)).toFormat('svg').toBuffer();
    const resizedSvgBuffer = await sharp(svgBuffer).resize(szelesseg, magassag).toBuffer();
    const resizedSvgBase64 = resizedSvgBuffer.toString('base64');   
    console.log(`Sikeresen átalakítva és méretezve és kódolva a ${metadata.format} típusú bemeneti kép:`, resizedSvgBase64);
    callback(null, resizedSvgBase64)
  } catch (error) {
    callback(error);
  }
}

module.exports = kepfeldolgozas;
