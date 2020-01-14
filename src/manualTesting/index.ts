import { create as createCurrency } from 'src/fp/currency/index.ts';
import { create as createMoney, format, add } from 'src/fp/money';
import changeCurrency from 'src/fp/money/changeCurrency';

const GBP = createCurrency('GBP', {
  code: 'GBP',
  symbol: '£',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

const USD = createCurrency('USD', {
  code: 'USD',
  symbol: '$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

const JPY = createCurrency('JPY', {
  code: 'JPY',
  symbol: '¥',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 0,
  pattern: '%ns%s%v',
});

const VND = createCurrency('VND', {
  code: 'VND',
  symbol: '₫',
  thousandsSeparator: '.',
  decimalSeparator: ',',
  decimalDigits: 1,
  pattern: '%ns%v %s',
});

const JOD = createCurrency('JOD', {
  code: 'JOD',
  symbol: 'د.ا.‏',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 3,
  pattern: '%s %ns%v',
});

const onePound = createMoney('1.00', GBP);

console.log(format(onePound));

const twoPoundThirtyOnePence = createMoney('2.31', GBP);

console.log(format(twoPoundThirtyOnePence));

const threePoundThirtyOnePence = add(onePound, twoPoundThirtyOnePence);

console.log(format(threePoundThirtyOnePence));

const threeDollarsThirtyOneCents = changeCurrency(threePoundThirtyOnePence, USD);

console.log(format(threeDollarsThirtyOneCents));

const threeYens = changeCurrency(threePoundThirtyOnePence, JPY);

console.log(format(threeYens));

const threeVNDs = changeCurrency(threePoundThirtyOnePence, VND);

console.log(format(threeVNDs));

const threeJODs = changeCurrency(threePoundThirtyOnePence, JOD);

console.log(format(threeJODs));
