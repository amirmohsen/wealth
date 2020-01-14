import createCurrency from 'src/fp/currency/create';

const KHR = createCurrency('KHR', {
  code: 'KHR',
  symbol: '៛',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 0,
  pattern: '%ns%v%s',
});

export default KHR;
