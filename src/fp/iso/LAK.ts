import createCurrency from 'src/fp/currency/createCurrency';

const LAK = createCurrency('LAK', {
  code: 'LAK',
  symbol: '₭',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 0,
  pattern: '%ns%v%s',
});

export default LAK;
