
const intToDigitArray = int => {
  return int.toString().split('').map(digit => parseInt(digit));
};

const LOW = 178416;
const HIGH = 676461;
let potentialPasswords = 0;

for (let num = LOW; num <= HIGH; num++) {
  const digits = intToDigitArray(num);

  let increasingOnly = true;
  let repeatCount = 1;
  let hasTwoRepeated = false;
  let previous = -1;

  for (let i = 0; i < digits.length; i++) {
    const d = digits[i];

    if (d < previous) {
      increasingOnly = false;
      break;
    }
    if (d === previous) {
      repeatCount++;

      if (i === digits.length - 1 && repeatCount === 2) {
        hasTwoRepeated = true;
      }
    } else {
      if (repeatCount === 2) {
        hasTwoRepeated = true;
      }
      repeatCount = 1;
    }
    previous = d;
  }

  if (increasingOnly && hasTwoRepeated) {
    potentialPasswords++;
  }
}

console.log(potentialPasswords);
