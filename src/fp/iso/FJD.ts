import createCurrency from 'src/fp/currency/create';

const FJD = createCurrency('FJD', {
  code: 'FJD',
  symbol: '$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default FJD;
