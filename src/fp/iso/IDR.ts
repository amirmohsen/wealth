import createCurrency from 'src/fp/currency/create';

const IDR = createCurrency('IDR', {
  code: 'IDR',
  symbol: 'Rp',
  thousandsSeparator: '.',
  decimalSeparator: ',',
  decimalDigits: 0,
  pattern: '%ns%s%v',
});

export default IDR;
