const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', 'utf8');
const lines = rawInput.split(/\n/);

const fuelCost = mass => {
  const immediateFuel = Math.floor(parseInt(mass) / 3) - 2;
  return immediateFuel < 0 ? 0 : immediateFuel + fuelCost(immediateFuel);
};

const result = lines.reduce((sum, line) => sum + fuelCost(parseInt(line)), 0);
console.log(result);
