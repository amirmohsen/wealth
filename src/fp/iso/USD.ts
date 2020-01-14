import createCurrency from 'src/fp/currency/create';

const USD = createCurrency('USD', {
  code: 'USD',
  symbol: '$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default USD;
