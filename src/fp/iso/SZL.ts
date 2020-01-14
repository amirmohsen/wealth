import createCurrency from 'src/fp/currency/create';

const SZL = createCurrency('SZL', {
  code: 'SZL',
  symbol: 'E',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default SZL;
