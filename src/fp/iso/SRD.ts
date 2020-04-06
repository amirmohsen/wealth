import createCurrency from 'src/fp/currency/createCurrency';

const SRD = createCurrency('SRD', {
  code: 'SRD',
  symbol: '$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default SRD;
