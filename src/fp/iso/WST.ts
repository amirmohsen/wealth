import createCurrency from 'src/fp/currency/create';

const WST = createCurrency('WST', {
  code: 'WST',
  symbol: 'WS$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default WST;
