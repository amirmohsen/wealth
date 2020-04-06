import createCurrency from 'src/fp/currency/createCurrency';

const FJD = createCurrency('FJD', {
  code: 'FJD',
  symbol: '$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default FJD;
