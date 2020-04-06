import createCurrency from 'src/fp/currency/createCurrency';

const LKR = createCurrency('LKR', {
  code: 'LKR',
  symbol: '₨',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 0,
  pattern: '%s %ns%v',
});

export default LKR;
