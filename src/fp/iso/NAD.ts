import createCurrency from 'src/fp/currency/createCurrency';

const NAD = createCurrency('NAD', {
  code: 'NAD',
  symbol: '$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default NAD;
