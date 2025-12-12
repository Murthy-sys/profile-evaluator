const { PDFParse } = require('pdf-parse');
const fs = require('fs');

console.log('PDFParse:', typeof PDFParse);
console.log('PDFParse.parse:', typeof PDFParse.parse);
console.log('PDFParse methods:', Object.getOwnPropertyNames(PDFParse));

// Check if it's a class
try {
  const instance = new PDFParse();
  console.log('Instance methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(instance)));
} catch (e) {
  console.log('Error creating instance:', e.message);
}
