import createCurrency from 'src/fp/currency/create';

const TTD = createCurrency('TTD', {
  code: 'TTD',
  symbol: 'TT$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default TTD;
