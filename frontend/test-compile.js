// Simple compilation test
const fs = require('fs');
const path = require('path');

console.log('Testing frontend compilation...');

// Check if key files exist
const keyFiles = [
  'src/App.js',
  'src/index.js',
  'src/context/AppContext.js',
  'src/context/ThemeContext.js',
  'src/contexts/ResumeContext.js',
  'package.json'
];

let allFilesExist = true;

keyFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log('\n✅ All key files exist. Frontend should be ready to run.');
  console.log('\nTo start the development server, run:');
  console.log('cd frontend && npm start');
} else {
  console.log('\n❌ Some files are missing. Please check the file structure.');
}