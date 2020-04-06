import createCurrency from 'src/fp/currency/createCurrency';

const GMD = createCurrency('GMD', {
  code: 'GMD',
  symbol: 'D',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%v%s',
});

export default GMD;
