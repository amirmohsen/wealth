import createCurrency from 'src/fp/currency/createCurrency';

const GBP = createCurrency('GBP', {
  code: 'GBP',
  symbol: '£',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default GBP;
