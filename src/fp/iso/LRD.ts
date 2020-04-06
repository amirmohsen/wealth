import createCurrency from 'src/fp/currency/createCurrency';

const LRD = createCurrency('LRD', {
  code: 'LRD',
  symbol: '$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default LRD;
