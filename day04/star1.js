
const intToDigitArray = int => {
  return int.toString().split('').map(digit => parseInt(digit));
};

const LOW = 178416;
const HIGH = 676461;
let potentialPasswords = 0;

for (let num = LOW; num <= HIGH; num++) {
  const digits = intToDigitArray(num);

  let increasingOnly = true;
  let hasRepeated = false;
  let previous = -1;

  for (const d of digits) {
    if (d < previous) {
      increasingOnly = false;
      break;
    }
    if (d === previous) {
      hasRepeated = true;
    }
    previous = d;
  }

  if (increasingOnly && hasRepeated) {
    potentialPasswords++;
  }
}

console.log(potentialPasswords);
