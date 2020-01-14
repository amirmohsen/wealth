import createCurrency from 'src/fp/currency/create';

const GHS = createCurrency('GHS', {
  code: 'GHS',
  symbol: '₵',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default GHS;
