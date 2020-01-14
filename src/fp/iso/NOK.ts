import createCurrency from 'src/fp/currency/create';

const NOK = createCurrency('NOK', {
  code: 'NOK',
  symbol: 'kr',
  thousandsSeparator: ' ',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default NOK;
