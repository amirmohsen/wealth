import createCurrency from 'src/fp/currency/create';

const LSL = createCurrency('LSL', {
  code: 'LSL',
  symbol: 'M',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%v%s',
});

export default LSL;
