import createCurrency from 'src/fp/currency/createCurrency';

const HNL = createCurrency('HNL', {
  code: 'HNL',
  symbol: 'L.',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default HNL;
