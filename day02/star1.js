const fs = require('fs');

// const rawInput = fs.readFileSync('./small_input5.txt', 'utf8');
const rawInput = fs.readFileSync('./input.txt', 'utf8');

const data = rawInput.split(',').map(d => parseInt(d));

const processOpcode = (data, opcodeIdx) => {
  const opcode = data[opcodeIdx];

  if (opcode === 99) {
    return false;
  }

  const a = data[data[opcodeIdx + 1]];
  const b = data[data[opcodeIdx + 2]];
  const cIdx = data[opcodeIdx + 3];
  const result = opcode === 1 ? a + b : a * b;
  data[cIdx] = result;

  return true;
};

// 1202 correction
data[1] = 12;
data[2] = 2;

let currentOpcodeIndex = 0;
while (processOpcode(data, currentOpcodeIndex)) {
  currentOpcodeIndex += 4;
}

console.log(`star1: ${data[0]}`);
