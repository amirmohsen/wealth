import createCurrency from 'src/fp/currency/create';

const GEL = createCurrency('GEL', {
  code: 'GEL',
  symbol: 'Lari',
  thousandsSeparator: ' ',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%v %s',
});

export default GEL;
