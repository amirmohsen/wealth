import createCurrency from 'src/fp/currency/create';

const OMR = createCurrency('OMR', {
  code: 'OMR',
  symbol: '﷼',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 3,
  pattern: '%s %ns%v',
});

export default OMR;
