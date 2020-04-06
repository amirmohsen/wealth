import createCurrency from 'src/fp/currency/createCurrency';

const ETB = createCurrency('ETB', {
  code: 'ETB',
  symbol: 'ETB',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default ETB;
