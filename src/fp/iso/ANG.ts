import createCurrency from 'src/fp/currency/create';

const ANG = createCurrency('ANG', {
  code: 'ANG',
  symbol: 'ƒ',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default ANG;
