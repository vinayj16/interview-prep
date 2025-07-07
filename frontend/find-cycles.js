const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, 'src');
const visited = new Set();
const visiting = new Set();
const cycles = [];

function findCycles(file, currentPath = []) {
  if (visiting.has(file)) {
    const cycleStart = currentPath.indexOf(file);
    if (cycleStart !== -1) {
      cycles.push([...currentPath.slice(cycleStart), file]);
    }
    return;
  }

  if (visited.has(file)) return;

  visiting.add(file);
  currentPath.push(file);

  try {
    const content = fs.readFileSync(file, 'utf8');
    const importRegex = /from\s+['"]([^'"]+)['"]/g;
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      let importPath = match[1];
      
      // Skip node_modules imports
      if (importPath.startsWith('.')) {
        const fullPath = path.resolve(path.dirname(file), importPath);
        const jsPath = fs.existsSync(`${fullPath}.js`) ? `${fullPath}.js` : 
                      fs.existsSync(`${fullPath}/index.js`) ? `${fullPath}/index.js` :
                      `${fullPath}.jsx`;
        
        if (fs.existsSync(jsPath)) {
          findCycles(jsPath, [...currentPath]);
        }
      }
    }
  } catch (err) {
    console.error(`Error processing ${file}:`, err.message);
  }

  visiting.delete(file);
  visited.add(file);
}

// Find all JS/JSX files in src
function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      findCycles(fullPath);
    }
  }
}

console.log('Analyzing for circular dependencies...');
processDirectory(projectRoot);

if (cycles.length > 0) {
  console.log('\nFound circular dependencies:');
  cycles.forEach((cycle, index) => {
    console.log(`\nCycle ${index + 1}:`);
    console.log(cycle.join(' -> '));
  });
} else {
  console.log('No circular dependencies found!');
}
