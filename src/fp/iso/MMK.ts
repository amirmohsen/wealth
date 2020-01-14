import createCurrency from 'src/fp/currency/create';

const MMK = createCurrency('MMK', {
  code: 'MMK',
  symbol: 'K',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default MMK;
