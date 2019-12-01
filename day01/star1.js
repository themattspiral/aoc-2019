const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', 'utf8');
const lines = rawInput.split(/\n/);

const result = lines.reduce((sum, line) => sum + Math.floor(parseInt(line) / 3) - 2, 0);
console.log(result);
