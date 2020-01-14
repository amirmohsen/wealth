import createCurrency from 'src/fp/currency/create';

const UGX = createCurrency('UGX', {
  code: 'UGX',
  symbol: 'USh',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default UGX;
