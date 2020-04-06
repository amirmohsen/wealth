import createCurrency from 'src/fp/currency/createCurrency';

const MMK = createCurrency('MMK', {
  code: 'MMK',
  symbol: 'K',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default MMK;
