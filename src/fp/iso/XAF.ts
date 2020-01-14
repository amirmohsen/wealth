import createCurrency from 'src/fp/currency/create';

const XAF = createCurrency('XAF', {
  code: 'XAF',
  symbol: 'F',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%v%s',
});

export default XAF;
