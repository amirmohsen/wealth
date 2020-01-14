import createCurrency from 'src/fp/currency/create';

const JPY = createCurrency('JPY', {
  code: 'JPY',
  symbol: '¥',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 0,
  pattern: '%ns%s%v',
});

export default JPY;
