import createCurrency from 'src/fp/currency/createCurrency';

const LBP = createCurrency('LBP', {
  code: 'LBP',
  symbol: 'ل.ل.‏',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default LBP;
