import createCurrency from 'src/fp/currency/createCurrency';

const COP = createCurrency('COP', {
  code: 'COP',
  symbol: '$',
  thousandsSeparator: '.',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default COP;
