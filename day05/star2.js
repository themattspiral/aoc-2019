const fs = require('fs');

// const rawInput = fs.readFileSync('./small_input.txt', 'utf8');
const rawInput = fs.readFileSync('./input.txt', 'utf8');

const data = rawInput.split(',').map(d => parseInt(d));

const getDigit = (number, indexFromRight) => {
  return Math.floor((number / Math.pow(10, indexFromRight)) % 10);
};

const parseOpcode = fullOpcode => ({
  opcode: fullOpcode % 100,
  p1Mode: getDigit(fullOpcode, 2),
  p2Mode: getDigit(fullOpcode, 3)
  // p3 is always a destination, so we always assume mode is position (0) and don't need to parse
});

const processOpcode = (data, opcodeIdx, inputCb, outputCb) => {
  const parsed = parseOpcode(data[opcodeIdx]);
  const a = parsed.p1Mode ? data[opcodeIdx + 1] : data[data[opcodeIdx + 1]];
  const b = parsed.p2Mode ? data[opcodeIdx + 2] : data[data[opcodeIdx + 2]];
  const c = data[opcodeIdx + 3];
  let nextIdx = opcodeIdx;

  if (parsed.opcode === 99) {
    nextIdx = -1;
  } else if (parsed.opcode === 1) {
    nextIdx += 4;
    data[c] = a + b;
  } else if (parsed.opcode === 2) {
    nextIdx += 4;
    data[c] = a * b;
  } else if (parsed.opcode === 3) {
    nextIdx += 2;
    const input = inputCb();
    const aAddr = data[opcodeIdx + 1]; // only param is a write destination so always use it as a position
    data[aAddr] = input;
    console.log(`Setting position ${aAddr} to Input (${input})`);
  } else if (parsed.opcode === 4) {
    nextIdx += 2;
    if (parsed.p1Mode) {
      outputCb(`Immediate Value Output: ${a}`);
    } else {
      outputCb(`Position Output: ${a}`);
    }
  } else if (parsed.opcode === 5) {
    nextIdx = a !== 0 ? b : nextIdx + 3;
  } else if (parsed.opcode === 6) {
    nextIdx = a === 0 ? b : nextIdx + 3;
  } else if (parsed.opcode === 7) {
    nextIdx += 4;
    data[c] = a < b ? 1 : 0;
  } else if (parsed.opcode === 8) {
    nextIdx += 4;
    data[c] = a === b ? 1 : 0;
  } else {
    throw new Error(`Unknown opcode: ${JSON.stringify(parsed)}`);
  }

  return nextIdx;
};

const runTillHalt = (data, inputCb, outputCb) => {
  const newData = data.concat([]); // copy array

  let currentOpcodeIndex = 0;
  do {
    currentOpcodeIndex = processOpcode(newData, currentOpcodeIndex, inputCb, outputCb);
  }
  while (currentOpcodeIndex > -1);
  console.log('halt.');
};

console.log('star2:');
const INPUT = () => 5;
const OUTPUT = val => { console.log(val); };
runTillHalt(data, INPUT, OUTPUT);
