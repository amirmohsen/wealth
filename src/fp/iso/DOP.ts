import createCurrency from 'src/fp/currency/createCurrency';

const DOP = createCurrency('DOP', {
  code: 'DOP',
  symbol: 'RD$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default DOP;
