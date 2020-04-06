import createCurrency from 'src/fp/currency/createCurrency';

const SAR = createCurrency('SAR', {
  code: 'SAR',
  symbol: '﷼',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default SAR;
