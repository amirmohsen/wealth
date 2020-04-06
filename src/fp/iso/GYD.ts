import createCurrency from 'src/fp/currency/createCurrency';

const GYD = createCurrency('GYD', {
  code: 'GYD',
  symbol: '$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default GYD;
