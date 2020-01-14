import createCurrency from 'src/fp/currency/create';

const GTQ = createCurrency('GTQ', {
  code: 'GTQ',
  symbol: 'Q',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default GTQ;
