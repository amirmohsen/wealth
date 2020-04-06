import createCurrency from 'src/fp/currency/createCurrency';

const CNY = createCurrency('CNY', {
  code: 'CNY',
  symbol: '¥',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default CNY;
