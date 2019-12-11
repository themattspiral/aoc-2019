const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', 'utf8');
// const rawInput = fs.readFileSync('./small_input.txt', 'utf8');
// const rawInput = fs.readFileSync('./small_input2.txt', 'utf8');
// const rawInput = fs.readFileSync('./small_input3.txt', 'utf8');
const wires = rawInput.split(/\n/);

const wirePathPointsMap = wire => {
  let x = 0;
  let y = 0;
  let steps = 0;

  const points = {};

  const dirs = wire.split(',');
  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i][0];

    // if on the last direction, add 1 to the stop value to include final point
    const dist = parseInt(dirs[i].substring(1)) + (i === dirs.length - 1 ? 1 : 0);

    if (dir === 'U') {
      const stop = y + dist;
      for (y; y < stop; y++, steps++) {
        const key = `${x},${y}`;
        if (!points[key]) points[key] = { x, y, steps };
      }
    } else if (dir === 'D') {
      const stop = y - dist;
      for (y; y > stop; y--, steps++) {
        const key = `${x},${y}`;
        if (!points[key]) points[key] = { x, y, steps };
      }
    } else if (dir === 'L') {
      const stop = x - dist;
      for (x; x > stop; x--, steps++) {
        const key = `${x},${y}`;
        if (!points[key]) points[key] = { x, y, steps };
      }
    } else if (dir === 'R') {
      const stop = x + dist;
      for (x; x < stop; x++, steps++) {
        const key = `${x},${y}`;
        if (!points[key]) points[key] = { x, y, steps };
      }
    }
  }

  // remove origin
  delete points['0,0'];

  return points;
};

const wireAPointsMap = wirePathPointsMap(wires[0]);

const dups = [];
Object.entries(wirePathPointsMap(wires[1])).forEach(([key, value]) => {
  if (wireAPointsMap[key]) {
    dups.push({
      wireAPoint: wireAPointsMap[key],
      wireBPoint: value
    });
  }
});

const minDist = dups.reduce((min, point) => {
  const { x, y } = point.wireAPoint;
  const dist = Math.abs(x) + Math.abs(y);
  return dist < min ? dist : min;
}, Number.MAX_SAFE_INTEGER);

console.log('star 1:', minDist);

const minSteps = dups.reduce((min, point) => {
  const steps = point.wireAPoint.steps + point.wireBPoint.steps;
  return steps < min ? steps : min;
}, Number.MAX_SAFE_INTEGER);

console.log('star 2:', minSteps);
