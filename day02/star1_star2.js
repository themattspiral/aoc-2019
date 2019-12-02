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

const runTillHalt = (data, noun, verb) => {
  const newData = data.concat([]); // copy array
  newData[1] = noun;
  newData[2] = verb;

  let currentOpcodeIndex = 0;
  while (processOpcode(newData, currentOpcodeIndex)) {
    currentOpcodeIndex += 4;
  }
  return newData[0];
};

const zero = runTillHalt(data, 12, 2);
console.log(`star1: ${zero}`);

const check = 19690720;
let done = false;
let noun;
let verb;
for (noun = 0; noun < 100; noun++) {
  for (verb = 0; verb < 100; verb++) {
    const zero = runTillHalt(data, noun, verb);
    if (zero === check) {
      done = true;
      break;
    }
  }
  if (done) {
    break;
  }
}

console.log(`star2: noun ${noun} and verb ${verb} produce ${check}. 100 * ${noun} + ${verb} = ${100 * noun + verb}`);
