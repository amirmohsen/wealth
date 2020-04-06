import createCurrency from 'src/fp/currency/createCurrency';

const SHP = createCurrency('SHP', {
  code: 'SHP',
  symbol: '£',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default SHP;
