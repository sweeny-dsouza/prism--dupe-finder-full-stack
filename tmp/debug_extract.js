const fs = require('fs');
const path = require('path');

const variableName = 'skincareProducts';
const content = fs.readFileSync('c:/Users/user/Downloads/Kimi_Agent_PRISM Dupe Finder/app/src/data/skincareProducts.ts', 'utf8');

const varIndex = content.indexOf(variableName);
const equalsIndex = content.indexOf('=', varIndex);
const startIndex = content.indexOf('[', equalsIndex !== -1 ? equalsIndex : varIndex);

let bracketCount = 0;
let endIndex = -1;
for (let i = startIndex; i < content.length; i++) {
    if (content[i] === '[') bracketCount++;
    else if (content[i] === ']') bracketCount--;
    
    if (bracketCount === 0) {
        endIndex = i;
        break;
    }
}

const arrayStr = content.substring(startIndex, endIndex + 1);
const cleanStr = arrayStr.replace(/\/\/.*$/gm, '').replace(/,\s*\]$/, ']');

try {
    const data = new Function(`return ${cleanStr}`)();
    console.log('Success! Extracted ' + data.length + ' products.');
} catch (e) {
    console.error('Failure: ' + e.message);
    // Find where it failed
    console.log('First 500 chars of cleanStr:');
    console.log(cleanStr.substring(0, 500));
}
