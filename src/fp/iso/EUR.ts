import createCurrency from 'src/fp/currency/createCurrency';

const EUR = createCurrency('EUR', {
  code: 'EUR',
  symbol: '€',
  thousandsSeparator: ' ',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%v %s',
});

export default EUR;
