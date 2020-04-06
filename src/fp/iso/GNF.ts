import createCurrency from 'src/fp/currency/createCurrency';

const GNF = createCurrency('GNF', {
  code: 'GNF',
  symbol: 'FG',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 0,
  pattern: '%ns%v%s',
});

export default GNF;
