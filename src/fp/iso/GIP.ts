import createCurrency from 'src/fp/currency/createCurrency';

const GIP = createCurrency('GIP', {
  code: 'GIP',
  symbol: '£',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default GIP;
