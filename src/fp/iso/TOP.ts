import createCurrency from 'src/fp/currency/create';

const TOP = createCurrency('TOP', {
  code: 'TOP',
  symbol: 'T$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default TOP;
