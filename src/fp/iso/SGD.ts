import createCurrency from 'src/fp/currency/create';

const SGD = createCurrency('SGD', {
  code: 'SGD',
  symbol: '$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default SGD;
