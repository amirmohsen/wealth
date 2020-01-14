import createCurrency from 'src/fp/currency/create';

const ZAR = createCurrency('ZAR', {
  code: 'ZAR',
  symbol: 'R',
  thousandsSeparator: ' ',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default ZAR;
