import createCurrency from 'src/fp/currency/create';

const BIF = createCurrency('BIF', {
  code: 'BIF',
  symbol: 'FBu',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 0,
  pattern: '%ns%v%s',
});

export default BIF;
