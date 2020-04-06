import createCurrency from 'src/fp/currency/createCurrency';

const THB = createCurrency('THB', {
  code: 'THB',
  symbol: '฿',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default THB;
