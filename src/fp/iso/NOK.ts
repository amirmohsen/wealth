import createCurrency from 'src/fp/currency/createCurrency';

const NOK = createCurrency('NOK', {
  code: 'NOK',
  symbol: 'kr',
  thousandsSeparator: ' ',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default NOK;
