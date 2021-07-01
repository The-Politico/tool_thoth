const NUMBERS = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
];

const toEnglishNumber = function toEnglishNumber(num) {
  if (num > NUMBERS.length - 1) {
    return `${num}`;
  }

  if (typeof num !== 'number') {
    return `${num}`;
  }

  return NUMBERS[num];
};

export default toEnglishNumber;
