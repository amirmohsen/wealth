import createCurrency from 'src/fp/currency/createCurrency';

const BMD = createCurrency('BMD', {
  code: 'BMD',
  symbol: '$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default BMD;
