import createCurrency from 'src/fp/currency/create';

const MVR = createCurrency('MVR', {
  code: 'MVR',
  symbol: 'MVR',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 1,
  pattern: '%ns%v %s',
});

export default MVR;
