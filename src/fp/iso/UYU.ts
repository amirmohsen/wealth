import createCurrency from 'src/fp/currency/create';

const UYU = createCurrency('UYU', {
  code: 'UYU',
  symbol: '$U',
  thousandsSeparator: '.',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default UYU;
