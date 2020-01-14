import createCurrency from 'src/fp/currency/create';

const XOF = createCurrency('XOF', {
  code: 'XOF',
  symbol: 'F',
  thousandsSeparator: ' ',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%v%s',
});

export default XOF;
