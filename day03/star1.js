const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', 'utf8');
// const rawInput = fs.readFileSync('./small_input2.txt', 'utf8');
// const rawInput = fs.readFileSync('./small_input3.txt', 'utf8');
const wires = rawInput.split(/\n/);

const wirePathPoints = wire => {
  let x = 0;
  let y = 0;

  const points = [];

  const dirs = wire.split(',');
  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i][0];

    // if on the last direction, add 1 to the stop value to include final point
    const dist = parseInt(dirs[i].substring(1)) + (i === dirs.length - 1 ? 1 : 0);

    if (dir === 'U') {
      const stop = y + dist;
      for (y; y < stop; y++) {
        points.push(`${x},${y}`);
      }
    } else if (dir === 'D') {
      const stop = y - dist;
      for (y; y > stop; y--) {
        points.push(`${x},${y}`);
      }
    } else if (dir === 'L') {
      const stop = x - dist;
      for (x; x > stop; x--) {
        points.push(`${x},${y}`);
      }
    } else if (dir === 'R') {
      const stop = x + dist;
      for (x; x < stop; x++) {
        points.push(`${x},${y}`);
      }
    }
  }

  // remove origin
  points.shift();

  return points;
};

const wire0PointsMap = wirePathPoints(wires[0]).reduce((map, point) => {
  // no need to check if point already exists (ok for wire to overlap itself)
  map[point] = true;
  return map;
}, {});

const dups = [];
wirePathPoints(wires[1]).forEach(point => {
  if (wire0PointsMap[point]) {
    dups.push(point);
  }
});

const minDist = dups.reduce((min, point) => {
  const [x, y] = point.split(',').map(v => parseInt(v));
  const dist = Math.abs(x) + Math.abs(y);
  return dist < min ? dist : min;
}, Number.MAX_SAFE_INTEGER);

console.log(minDist);
