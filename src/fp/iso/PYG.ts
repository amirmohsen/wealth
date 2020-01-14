import createCurrency from 'src/fp/currency/create';

const PYG = createCurrency('PYG', {
  code: 'PYG',
  symbol: '₲',
  thousandsSeparator: '.',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default PYG;
