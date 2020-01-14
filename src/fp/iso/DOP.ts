import createCurrency from 'src/fp/currency/create';

const DOP = createCurrency('DOP', {
  code: 'DOP',
  symbol: 'RD$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default DOP;
