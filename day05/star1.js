const fs = require('fs');

// const rawInput = fs.readFileSync('./small_input.txt', 'utf8');
// const rawInput = fs.readFileSync('./small_input2.txt', 'utf8');
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


const processOpcode = (data, opcodeIdx, input, outputCb) => {
  const parsed = parseOpcode(data[opcodeIdx]);
  let paramCount = 0;

  if (parsed.opcode === 99) {
    paramCount = 0; // no params will mean halt to the execution loop
  } else if (parsed.opcode === 1 || parsed.opcode === 2) {
    paramCount = 3;
    const a = parsed.p1Mode ? data[opcodeIdx + 1] : data[data[opcodeIdx + 1]];
    const b = parsed.p2Mode ? data[opcodeIdx + 2] : data[data[opcodeIdx + 2]];
    const cAddr = data[opcodeIdx + 3];
    const result = parsed.opcode === 1 ? a + b : a * b;
    data[cAddr] = result;
  } else if (parsed.opcode === 3) {
    paramCount = 1;
    const addr = data[opcodeIdx + 1];
    data[addr] = input;
    console.log(`Setting position ${addr} to Input (${input})`);
  } else if (parsed.opcode === 4) {
    paramCount = 1;
    const num = data[opcodeIdx + 1];
    if (parsed.p1Mode) {
      outputCb(`Immediate Value Output: ${num}`);
    } else {
      outputCb(`Value at Position ${num} Output: ${data[num]}`);
    }
  }

  return paramCount;
};

const runTillHalt = (data, input, outputCb) => {
  const newData = data.concat([]); // copy array

  let currentOpcodeIndex = 0;
  let paramCount;
  while (paramCount = processOpcode(newData, currentOpcodeIndex, input, outputCb)) {
    currentOpcodeIndex += paramCount + 1;
  }
  console.log('halt.');
};

console.log('star1:');
const INPUT = 1;
const OUTPUT = val => { console.log(val); };
runTillHalt(data, INPUT, OUTPUT);
