import createCurrency from 'src/fp/currency/createCurrency';

const PGK = createCurrency('PGK', {
  code: 'PGK',
  symbol: 'K',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default PGK;
