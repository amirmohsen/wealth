import createCurrency from 'src/fp/currency/createCurrency';

const CHF = createCurrency('CHF', {
  code: 'CHF',
  symbol: 'CHF',
  thousandsSeparator: "'",
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%v %s',
});

export default CHF;
