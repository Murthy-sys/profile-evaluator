const pdfParse = require('pdf-parse');
const fs = require('fs');

console.log('Type:', typeof pdfParse);
console.log('Is function:', typeof pdfParse === 'function');
console.log('Keys:', Object.keys(pdfParse));

// Test with a buffer
const testBuffer = Buffer.from('%PDF-1.4');
if (typeof pdfParse === 'function') {
  console.log('pdfParse is a function - this is correct!');
}
