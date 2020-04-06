import createCurrency from 'src/fp/currency/createCurrency';

const SBD = createCurrency('SBD', {
  code: 'SBD',
  symbol: '$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default SBD;
