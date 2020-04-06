import createCurrency from 'src/fp/currency/createCurrency';

const LYD = createCurrency('LYD', {
  code: 'LYD',
  symbol: 'د.ل.‏',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 3,
  pattern: '%ns%s%v',
});

export default LYD;
