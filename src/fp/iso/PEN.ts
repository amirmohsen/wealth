import createCurrency from 'src/fp/currency/create';

const PEN = createCurrency('PEN', {
  code: 'PEN',
  symbol: 'S/.',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default PEN;
