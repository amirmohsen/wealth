import createCurrency from 'src/fp/currency/create';

const VUV = createCurrency('VUV', {
  code: 'VUV',
  symbol: 'VT',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 0,
  pattern: '%ns%v%s',
});

export default VUV;
